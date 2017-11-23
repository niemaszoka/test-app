import { UserData } from './user-data.interface';
import { AuthToken } from './auth-token.interface';

export class User {
    protected data : UserData;

    constructor(email: string = '', password: string = '', authToken: AuthToken) {
        this.data = {
          email: email,
          password: password,
          authToken: authToken,
          id: this.generateUserId()
        };
    }

    public getAuthToken() {
        return this.data.authToken;
    }

    public getUserData() {
        return this.data;
    }

    public setEmail(email: string) {
        this.data.email = email;
    }

    public setPassword(password: string) {
        this.data.password = password;
    }

    public setAuthToken(authToken: AuthToken) {
        this.data.authToken = authToken;
    }

    public checkPassword(passwordToCheck: string) {
        return this.data.password === passwordToCheck;
    }

    public checkTokenId(tokenIdToCheck: string) {
        return this.data.authToken.tokenId === tokenIdToCheck;
    }

    public hasEmail(): boolean {
        return this.data.email.length !== 0;
    }

    public hasPassword(): boolean {
        return this.data.password.length !== 0;
    }

    public addTokenData(authToken: AuthToken) {
        this.data.authToken = authToken;
    }

  private generateUserId = (): string => {
    return Math.ceil(Math.random() * Date.now()).toString();
  }
}