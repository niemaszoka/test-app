import { Injectable } from '@angular/core';
import { AuthToken } from '../data-models/auth-token.interface';
import { DatabaseService } from './database.service';
import { UserData } from '../data-models/user-data.interface';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from './localStorage.service';
import { User } from '../data-models/user-data-model';

@Injectable()

export class AuthService {
  private getUserDataObservable: Observable<UserData>;
  private loginUserObservable: Observable<boolean>;
  private logoutFromAppObservable: Observable<boolean>;
  private registeredUser: User = null;
  private readonly tokenDurationInHours: number = 24;
  private readonly AUTH_DATA_LOCAL_STORAGE_KEY = 'user-auth-data';

  constructor(private databaseService: DatabaseService,
              protected localStorageService: LocalStorageService) {

  }

  loginUserWithPassword = (password: string) => {
    const isPasswordCorrect = this.checkPasswordForRegisteredUser(password);

    this.loginUserObservable = new Observable(observer => {
      if (isPasswordCorrect) {
        const newAuthData = this.generateAuthToken();
        this.updateCurrentUserAuthToken(newAuthData);
        this.saveUserAuthData(newAuthData);
        observer.next();
        observer.complete();
      } else {
        observer.error();
      }
    });
    
    return this.loginUserObservable;
  };

  public isUserAuthenticated = (): boolean => {
    const savedAuthData: AuthToken = this.getUserSavedAuthData();
    if (savedAuthData) {
      return this.isTokenExpired(savedAuthData) && this.isTokenValid(savedAuthData);
    } else {
      return false;
    }
  };

  public getRegisteredUserData = (email: string): Observable<UserData> => {
    this.getUserDataObservable =  new Observable(observer => {
      const registeredUser = this.databaseService.getUserByEmail(email);
      if (registeredUser) {
        observer.next(registeredUser);
        observer.complete();
      } else {
        observer.error();
      }
    });
    return this.getUserDataObservable;
  };

  public saveRegisteredUserData =(userData: UserData) => {
    this.registeredUser = new User(userData.email, userData.password, userData.authToken);
  };

  public registerUser = (email: string, password: string) => {
    const authToken = this.generateAuthToken();
    const newUser = new User(email, password, authToken);
    const newUserData: UserData = newUser.getUserData();

    this.databaseService.addUserData(newUserData);
    this.saveUserAuthData(authToken);
    this.saveRegisteredUserData(newUserData);
  };

  public checkPasswordForRegisteredUser = (password: string): boolean => {
    return password === this.registeredUser.getUserData().password;
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
    return this.registeredUser !== null;
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
      this.registeredUser = null;
      observer.next(true);
      observer.complete();
    });

    return this.logoutFromAppObservable;
  };

  private updateCurrentUserAuthToken = (newAuthToken: AuthToken) => {
    this.registeredUser.setAuthToken(newAuthToken);
    this.databaseService.updateUserData(this.registeredUser.getUserData());
  };

  private isTokenExpired = (token: AuthToken) => {
    return token.expiryDate > Date.now();
  };

  private isTokenValid = (token: AuthToken) => {
    return token.tokenId.length !== 0;
  };
}