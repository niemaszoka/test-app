import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class RestService {

  constructor(private httpClient: HttpClient) {

  }

  public getVideosListForPhrase = (phrase: string, pageToken: string, limit: number = 20) => {
    const preparedParams = this.prepareVideoListParameters(phrase, pageToken, limit);

    return this.httpClient.get('https://www.googleapis.com/youtube/v3/search', {
      params: preparedParams
    });
  };

  private prepareVideoListParameters = (phrase: string, pageToken: string, limit: number) => {
    let params = {
      key: 'AIzaSyDEWvzZHv8q6nvQsawh89mc9rDLULFQFtQ',
      maxResults: limit.toString(),
      part: 'snippet',
      q: phrase,
      type: 'video',
      order: 'viewCount'
    };

    if (pageToken) {
      params['pageToken'] = pageToken;
    }

    return params;
  }
}