import { AuthToken } from './auth-token.interface';

export interface UserData {
  email: string,
  password: string,
  authToken: AuthToken
}