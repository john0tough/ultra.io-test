import { Observable } from 'rxjs';
import { GifModel } from './gif.model';
import { GifPage } from './gif-page.model';

export abstract class GifProvider {
    abstract trending(pageSize: number, pageNumber: number): Observable<GifPage>;
    abstract search(tags: string[], pageSize: number, pageNumber: number): Observable<GifPage>;
}
