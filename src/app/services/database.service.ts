import { Injectable } from '@angular/core';
import { Database } from '../data-models/database-data-model';
import { UserData } from '../data-models/user-data.interface';
import { LocalStorageService } from './localStorage.service';

@Injectable()

export class DatabaseService {
  private database: Database;
  private readonly DATABASE_LOCAL_STORAGE_KEY = 'yv-database';

  constructor(private localStorageService: LocalStorageService) {
    this.database = this.getDatabase();
  }

  public addUserData = (user: UserData) => {
    const newUserID = this.generateId();
    if (!this.database.data.hasOwnProperty('users')) {
      this.database.data.users = {};
    }
    this.database.data.users[newUserID] = user;
    this.saveDatabase();
  };

  public updateUserData = (userData: UserData) => {
    const userId = userData.id;
    this.database.data.users[userId] = userData;
    this.saveDatabase();
  };

  public getUserByEmail = (email: string) => {
    return this.getUserDataByField('email', email);
  };

  public getUserDataByField = (fieldName: string, fieldValue: any): UserData => {
    const users = this.database.data.users;

    if (users) {
      const keys = Object.keys(users);

      for(let i = 0; i < keys.length; i++) {
        if (users[keys[i]][fieldName] === fieldValue) {
          return users[keys[i]];
        }
      }
    }
    return null;
  };

  private getDatabase = (): Database => {
    let savedDatabase = this.localStorageService.get(this.DATABASE_LOCAL_STORAGE_KEY);

    if (!savedDatabase) {
      savedDatabase = {data: {}};
      this.localStorageService.set(this.DATABASE_LOCAL_STORAGE_KEY, savedDatabase);
    }
    return savedDatabase;
  };

  private saveDatabase = () => {
    this.localStorageService.set(this.DATABASE_LOCAL_STORAGE_KEY, this.database);
  };

  private generateId = () => {
    return Math.ceil(Math.random() * Date.now());
  }
}
