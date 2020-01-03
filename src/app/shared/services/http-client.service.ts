import { WebApiClient } from '../contracts/http-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class GiphyWebApiClient implements WebApiClient {
    constructor(private http: HttpClient) { }

    get<T>(resource: string, params: { [param: string]: string } | undefined): Observable<T> {
        const url = this.formatUrl(resource);
        return this.http.get<T>(url, { params });
    }

    private formatUrl(resource: string): string {
        return `https://${environment.giphyApiURI}/${resource}?api_key=${environment.giphyApiKey}`;
    }

}
