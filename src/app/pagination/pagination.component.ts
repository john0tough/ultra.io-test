import { Component, OnInit, Input } from '@angular/core';
import { Pagination } from '../shared/contracts/pagination.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  currentPage$: Observable<number>;
  prevPage$: Observable<number>;
  nextPage$: Observable<number>;
  totalPages$: Observable<number>;
  pageList$: Observable<{ page: number; isCurrentPage: boolean }[]>;
  url: string;
  @Input('pagination')
  set paging(values$: Observable<Pagination>) {
    this.mapPaginationElements(values$);
  }

  private mapPaginationElements(values$: Observable<Pagination>): void {
    this.currentPage$ = values$.pipe(map(page => page.pageNumber));
    this.prevPage$ = values$.pipe(map(page => (page.pageNumber - 1 > 0 ? page.pageNumber - 1 : 1)));
    this.nextPage$ = values$.pipe(map(page => (page.pageNumber + 1 < page.totalPages ? page.pageNumber + 1 : page.totalPages)));
    this.totalPages$ = values$.pipe(map(page => page.totalPages));

    const pageNumerationFn = (pageNumber: number, isCurrentPage: boolean) => ({
      page: pageNumber,
      isCurrentPage
    });

    this.pageList$ = values$.pipe(
      map(page => ([...new Array(page.totalPages > 10 ? 10 : page.totalPages)].map((val, idx) =>
          page.pageNumber < 6
            ? pageNumerationFn(idx + 1, idx + 1 === page.pageNumber ? true : false)
            : page.pageNumber + 4 < page.totalPages
              ? pageNumerationFn(page.pageNumber - 5 + idx, page.pageNumber - 5 + idx === page.pageNumber ? true : false)
              : pageNumerationFn(page.totalPages - 9 + idx, page.totalPages - 9 + idx === page.pageNumber ? true : false)
        ))
      )
    );
  }
}
