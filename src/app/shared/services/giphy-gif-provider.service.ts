import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { GifProvider } from '../contracts/gif-provider';
import { GifPage } from '../contracts/gif-page.model';
import { WebApiClient } from '../contracts/http-client';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GiphyGifProvider implements GifProvider {
  constructor(private webService: WebApiClient) {}
  trending(pageSize: number, pageNumber: number): Observable<GifPage> {
    return this.makeRequest('trending', pageSize, pageNumber);
  }
  search(tags: string[], pageSize: number, pageNumber: number): Observable<GifPage> {
    return this.makeRequest('search', pageSize, pageNumber, { q: tags.join('-') });
  }

  private makeRequest(
    resource: string,
    pageSize: number,
    pageNumber: number,
    extraParams?: {}
  ): Observable<GifPage> {
    return this.webService.get<any>(resource, {
      ...this.getDefaultParamsRequest(pageSize, pageNumber),
      ...extraParams
    }).pipe(
      map<any, GifPage>(response => ({
        gifs: response.data.map(element => ({
          src: element.images.fixed_width.url,
          title: element.title,
          url: element.url
        })),
        pagination: {
          pageNumber: Math.round(response.pagination.offset / pageSize) + 1,
          pageSize,
          totalElements: response.pagination.total_count,
          totalPages: Math.ceil(response.pagination.total_count / pageSize)
        }
      })));
  }

  private getDefaultParamsRequest(
    pageSize: number,
    pageNumber: number
  ): {
    limit: string;
    offset: string;
    rating: string;
  } {
    return {
      limit: pageSize.toString(),
      offset: ((pageNumber - 1) * pageSize).toString(),
      rating: 'G'
    };
  }
}
