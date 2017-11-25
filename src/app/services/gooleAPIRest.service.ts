import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class GoogleAPIRestService {
	private readonly GOOGLE_APIS_DOMAIN: string = 'https://www.googleapis.com';
	private readonly YOUTUBE_API_POSTFIX: string = '/youtube/v3/';
	private readonly GOOGLE_APIS_KEY: string = 'AIzaSyDEWvzZHv8q6nvQsawh89mc9rDLULFQFtQ';
	private readonly DEFAULT_PARAMETERS = {
		part: 'snippet',
		order: 'viewCount'
	};

	constructor(private httpClient: HttpClient) {

	}

	public getVideoData = (videoId: string): Observable<any> => {
		const params = {
			id: videoId,
			part: this.DEFAULT_PARAMETERS.part
		};
		return this.makeGoogleAPIRequest('videos', params);
	};

	public getVideosListForPhrase = (phrase: string, pageToken: string, limit: number = 20): Observable<any> => {
		const preparedParams = this.prepareVideoListParameters(phrase, pageToken, limit);
		return this.makeGoogleAPIRequest('search', preparedParams)
	};

	private prepareVideoListParameters = (phrase: string, pageToken: string, limit: number) => {
		const params = {
			maxResults: limit.toString(),
			part: this.DEFAULT_PARAMETERS.part,
			q: phrase,
			type: 'video',
			order: this.DEFAULT_PARAMETERS.order
		};

		if (pageToken) {
			params['pageToken'] = pageToken;
		}

		return params;
	};

	private makeGoogleAPIRequest = (dataReguestType: string, params) => {
		const paramsWithAPIKey = params;
		paramsWithAPIKey.key = this.GOOGLE_APIS_KEY;
		const url = this.GOOGLE_APIS_DOMAIN.concat(this.YOUTUBE_API_POSTFIX, dataReguestType);

		return this.httpClient.get(url, {params});
	};
}