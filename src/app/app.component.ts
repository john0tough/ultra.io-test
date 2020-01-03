import { Component } from '@angular/core';
import { jsonTrend } from './trend';
import { Image } from './image.model';
import { GifProvider } from './shared/contracts/gif-provider';
import { map } from 'rxjs/operators';
import { GifModel } from './shared/contracts/gif.model';
import { Observable } from 'rxjs';
import { Pagination } from './shared/contracts/pagination.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-test';
}
