import { CarWorldApiResponse } from '../common/carWorldApiResponse'

export interface AuthServiceInterface {
  register(username: string, password: string): CarWorldApiResponse;

  login(username: string, password: string): CarWorldApiResponse;
}
