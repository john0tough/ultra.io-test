import { Component, OnInit } from '@angular/core';
import { GifProvider } from '../shared/contracts/gif-provider';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AbstractPage } from './abstract-page';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class TrendingPageComponent extends AbstractPage implements OnInit {
  constructor(
    gifProvider: GifProvider,
    route: ActivatedRoute
  ) {
    super(route.paramMap.pipe(
        map((params: ParamMap) => parseInt(params.get('pageNumber'), 10)),
        switchMap(pageNumber =>
          gifProvider.trending(this.pageElementaSize, pageNumber > 0 ?  pageNumber : this.defaultPageNumber ))
      ));
  }
}
