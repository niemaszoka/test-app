import { Injectable } from '@angular/core';
import { User } from '../data-models/user-data-model';
import { Database } from '../data-models/database-data-model';
import { RestService } from './rest.service';

@Injectable()

export class DatabaseService {
  protected database: Database;

  constructor(private restService: RestService) {
    console.log('constructor');
    this.getDatabase().subscribe((database: Database) => {
      console.log('after');
      this.database = database;
      this.addUser({
        email: 'test email',
        password: 'test password'
      });
    });
  }

  public addUser = (user: User) => {
    const newUserID = this.generateId();
    this.database.data.users[newUserID] = user;
    this.saveDatabase();
  };

  public getUserByEmail = (email: string) => {
    const users = this.database.data.users;
    const keys = Object.keys(users);

    for(let i = 0; i < keys.length; i++) {
      if (users[keys[i]].email === email) {
        return users[keys[i]];
      }
    }
    return null;
  };

  private getDatabase = () => {
    return this.restService.getDatabase();
  };

  private saveDatabase = () => {
    const linkElement = document.createElement('a');
    const file = new Blob([this.database], {type: 'json'});
    linkElement.href = URL.createObjectURL(file);
    linkElement.download = name;
    linkElement.click();
    console.log(this.database);
  };

  private generateId = () => {
    return Math.ceil(Math.random() * Date.now());
  }
}