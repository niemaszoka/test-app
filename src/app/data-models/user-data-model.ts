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

	public getUserData() {
		return this.data;
	}

	public getAuthToken() {
		return this.data.authToken;
	}

	public setAuthToken(authToken: AuthToken) {
		this.data.authToken = authToken;
	}

	private generateUserId = (): string => {
		return Math.ceil(Math.random() * Date.now()).toString();
	}
}