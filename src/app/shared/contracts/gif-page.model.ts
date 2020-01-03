import { GifModel } from './gif.model';
import { Pagination } from './pagination.model';

export interface GifPage {
    gifs: GifModel[];
    pagination: Pagination;
}
