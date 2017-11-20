import { Injectable } from '@angular/core';
import { AuthToken } from '../data-models/auth-token.interface';
import { DatabaseService } from './database.service';
import { UserData } from '../data-models/user-data.interface';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from './localStorage.service';

@Injectable()

export class AuthService {
  private getUserDataObservable: Observable<UserData>;
  private loginUserObservable: Observable<boolean>;
  private logoutFromAppObservable: Observable<boolean>;
  private registeredUserData: UserData = null;
  private readonly tokenDurationInHours: number = 24;
  private readonly AUTH_DATA_LOCAL_STORAGE_KEY = 'user-auth-data';

  constructor(private databaseService: DatabaseService,
              protected localStorageService: LocalStorageService) {
  }

  loginUserWithPassword = (password: string) => {
    const isPasswordCorrect = this.checkPasswordForRegisteredUser(password);
    this.saveUserAuthData(this.registeredUserData.authToken);

    this.loginUserObservable = new Observable(observer => {
      if (isPasswordCorrect) {
        observer.next();
      } else {
        observer.error();
      }
    });
    return this.loginUserObservable;
  };

  public isUserAuthenticated = (): boolean => {
    const savedAuthData: AuthToken = this.getUserSavedAuthData();
    if (savedAuthData) {
      const isTokenNotExpired = savedAuthData.expiryDate > Date.now();
      const isTokenValid = savedAuthData.tokenId.length !== 0;
      return isTokenNotExpired && isTokenValid
    } else {
      return false;
    }
  };

  public getRegisteredUserData = (email: string): Observable<UserData> => {
    this.getUserDataObservable =  new Observable(observer => {
      const registeredUser = this.databaseService.getUserByEmail(email);
      if (registeredUser) {
        observer.next(registeredUser);
      } else {
        observer.error();
      }
    });
    return this.getUserDataObservable;
  };

  public saveRegisteredUserData =(userData: UserData) => {
    this.registeredUserData = userData;
  };

  public registerUser = (email: string, password: string) => {
    const authToken = this.generateAuthToken();
    const newUserData: UserData = {
      email,
      password,
      authToken
    };
    this.databaseService.addUserData(newUserData);
    this.saveUserAuthData(authToken);
  };

  public checkPasswordForRegisteredUser = (password: string): boolean => {
    return password === this.registeredUserData.password;
  };

  public generateAuthToken = (): AuthToken => {
    return {
      tokenId: this.createAuthToken(),
      expiryDate: this.createExpiryDate()
    };
  };

  public createAuthToken = (): string => {
      let token = '';
      const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < 10; i++)
        token += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));

      return token;
  };

  public createExpiryDate = (): number => {
    return new Date().setHours(this.tokenDurationInHours);
  };

  public isCurrentUserRegistered = (): boolean => {
    return this.registeredUserData !== null;
  };

  public getUserSavedAuthData = (): AuthToken => {
    return JSON.parse(localStorage.getItem('user-auth-data'));
  };

  public saveUserAuthData = (authToken: AuthToken) => {
    this.localStorageService.set(this.AUTH_DATA_LOCAL_STORAGE_KEY, authToken);
  };

  public clearUserAuthData = () => {
    this.localStorageService.remove(this.AUTH_DATA_LOCAL_STORAGE_KEY);
  };

  public logoutFromApp = () => {
    this.logoutFromAppObservable = new Observable((observer) => {
      this.clearUserAuthData();
      this.registeredUserData = null;
      observer.next(true);
    });

    return this.logoutFromAppObservable;
  }
}