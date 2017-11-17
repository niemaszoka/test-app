import {Injectable} from "@angular/core";
import {User} from "../data-models/user-data-model";

@Injectable()

export class UserService {
  protected _user: User = {
    email: '',
    password: ''
  };

  public setUserEmail = (email: string) => {
    this._user.email = email;
  };

  public setUserPassword = (password: string) => {
    this._user.password = password;
  };

  public getUser = () => {
    return this._user;
  };
}