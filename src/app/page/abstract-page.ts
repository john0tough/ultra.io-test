import { Observable } from 'rxjs';
import { Pagination } from '../shared/contracts/pagination.model';
import { GifModel } from '../shared/contracts/gif.model';
import { GifPage } from '../shared/contracts/gif-page.model';
import { map, shareReplay } from 'rxjs/operators';

export abstract class AbstractPage {
  gifs$: Observable<GifModel[]>;
  pagination$: Observable<Pagination>;
  pageElementaSize = 9;
  defaultPageNumber = 1;
  private content$: Observable<GifPage>;
  constructor(ob$: Observable<GifPage>) {
    this.content$ = ob$.pipe(shareReplay(1));
  }

  ngOnInit() {
    this.gifs$ = this.content$.pipe(map(obj => obj.gifs));
    this.pagination$ = this.content$.pipe(map(obj => obj.pagination));
  }
}
