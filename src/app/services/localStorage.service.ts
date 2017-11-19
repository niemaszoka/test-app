import { Injectable } from '@angular/core';

@Injectable()

export class LocalStorageService {
  public set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }
}
