import { AuthToken } from './auth-token.interface';

export class UserData {
  email: string;
  password: string;
  authToken: AuthToken;
  id: string;
}