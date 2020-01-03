import { Observable } from 'rxjs';

export abstract class WebApiClient {
    abstract get<T>(resource: string, params: { [param: string]: string } | undefined ): Observable<T>;
}
