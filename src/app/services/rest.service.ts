import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class RestService {

  constructor(private httpClient: HttpClient) {

  }

  public getVideosListForPhrase = (phrase: string) => {
    return this.httpClient.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: 'AIzaSyDEWvzZHv8q6nvQsawh89mc9rDLULFQFtQ',
        maxResults: '25',
        part: 'snippet',
        q: phrase,
        type: ''
      }
    });
  };
}