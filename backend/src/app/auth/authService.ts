import { CarWorldApiResponse } from '../common/carWorldApiResponse'
import { AuthServiceInterface } from './authServiceInterface'
import { Account, AccountType  } from '../../db/models/account'
import { PEPPER } from './authConstants'
import { bcrypt } from 'bcrypt'

export class AuthService implements AuthServiceInterface {

  async register(username: string, password: string): CarWorldApiResponse {
    let res = new CarWorldApiResponse()

    const salt = Crypto.randomBytes(128).toString('base64') // TODO: import nodeJS crypto lib
    const hashedPassword = await this.hashPassword(password, salt)

    const accountRecord = new Account()
    accountRecord.username = username
    accountRecord.password = hashedPassword
    accountRecord.salt = salt
    accountRecord.type = AccountType.Standard

    try {
      accountRecord.save()
    } catch (e: unknown) {
      res.code = 500
      res.message = 'Failed to save account record'
    }

    res.code = 200
    res.message = 'client successfully registered',
    return res
  }

  async login(username: string, password: string): CarWorldApiResponse {
    let res = new CarWorldApiResponse()

    const accountRecord = await Account.findOne({ username: username })
    if (accountRecord == null) {
      res.code = 401
      res.message = `No record found for a user with the name ${username}`
      return res
    }

    try {
      if (await this.isValidPassword(accountRecord, password)) {
        // TODO: Generate JSON auth token
        res.code = 200
        res.message = 'client successfully identified',
        res.data = { authToken: '' }
      } else {
        res.code = 401
        res.message = 'Invalid password'
      }
    } catch (e: unknown) {
      res.code = 500
      res.message = 'Crash during password validation'
    }

    return res
  }

  private async isValidPassword(accountRecord: Account, password: string): Promise<boolean> {
    const salt = accountRecord.salt
    const hashedPassword = await this.hashPassword(password, salt)

    return hashedPassword === accountRecord.password
  }

  private async hashPassword(password: string, salt: string): string {
    try {
      password = await bcrypt.hash(password, PEPPER)
      return await bcrypt.hash(password, salt)
    } catch (e: unknown) {
      // TODO: replace with logging and handle error
      throw 'bcrypt failed to hash the password'
    }
  }
}
