import { Injectable } from '@angular/core';

@Injectable()

export class AuthService {
  public isUserAuthenticated(): boolean {
    return true;
  }
}