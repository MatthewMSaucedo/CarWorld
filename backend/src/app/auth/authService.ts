import { CarWorldApiResponse } from '../common/carWorldApiResponse';
import { AuthServiceInterface } from './authServiceInterface';
import { Account  } from '../../db/models/account';
import { PEPPER } from './authConstants';
import { bcrypt } from 'bcrypt'

export class AuthService implements AuthServiceInterface {

  async register(username: string, password: string): CarWorldApiResponse {
    let res = new CarWorldApiResponse()

    const salt = Crypto.randomBytes(128).toString('base64'); // TODO: import nodeJS crypto lib
    const hashedPassword = await this.hashPassword(password, salt);

    const accountRecord = new Account();
    accountRecord.username = username;
    accountRecord.password = hashedPassword;
    accountRecord.salt = salt;

    try {
      accountRecord.save();
    } catch (e: unknown) {
      // TODO: handle error
      res.code = 500;
      res.response = 'Failed to save account record'
    }

    // TODO: format 200 res

    return res
  }

  async login(username: string, password: string): CarWorldApiResponse {
    let res = new CarWorldApiResponse()

    if (await this.isValidPassword(username, password)) {
      // TODO: Generate JSON auth token

      res.code = 200;
      res.response = {
        message: 'client successfully identified',
        authToken: ''
      }

    } else {
      res.code = 401;
      res.response = 'Invalid password'
    }

    return res
  }

  private async isValidPassword(username: string, password: string): Promise<boolean> {
    const accountRecord = await Account.findOne({ username: username })
    if (accountRecord == null) return false

    const salt = accountRecord.salt
    const hashedPassword = await this.hashPassword(password, salt)

    return hashedPassword === accountRecord.password
  }

  private async hashPassword(password: string, salt: string): string {
    password.concat(salt)
    password.concat(PEPPER)
    try {
      return await bcrypt.hash(password, salt)
    } catch (e: unknown) {
      // TODO: replace with logging and handle error
      throw 'bcrypt failed to hash the password'
    }
  }

}
