import { Component, OnInit } from '@angular/core';
import { GifProvider } from '../shared/contracts/gif-provider';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AbstractPage } from './abstract-page';

@Component({
  selector: 'app-search-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class SearchPageComponent extends AbstractPage implements OnInit {
  constructor(gifProvider: GifProvider, route: ActivatedRoute) {
    super(
      route.paramMap.pipe(
        map((params: ParamMap) => ({ pageNumber: parseInt(params.get('pageNumber'), 10), tags: params.get('q').split('-') })),
        switchMap(params =>
          gifProvider.search(
            params.tags,
            this.pageElementaSize,
            params.pageNumber > 0 ? params.pageNumber : this.defaultPageNumber
          )
        )
      )
    );
  }
}
