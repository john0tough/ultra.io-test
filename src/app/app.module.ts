import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GiphyWebApiClient } from './shared/services/http-client.service';
import { GiphyGifProvider } from './shared/services/giphy-gif-provider.service';
import { WebApiClient } from './shared/contracts/http-client';
import { GifProvider } from './shared/contracts/gif-provider';
import { HttpClientModule } from '@angular/common/http';
import { GifListComponent } from './gif-list/gif-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TrendingPageComponent } from './page/page.component';
import { SearchComponent } from './search/search.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './page/search-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/trending/1',
    pathMatch: 'full'
  },
  { path: 'trending/:pageNumber', component: TrendingPageComponent },
  { path: 'search/:q/:pageNumber', component: SearchPageComponent },
  {
    path: 'search',
    redirectTo: '/trending/1',
    pathMatch: 'prefix'
  },
  { path: '**', component: ErrorPageComponent, pathMatch: 'full' },
];
@NgModule({
  declarations: [
    AppComponent,
    GifListComponent,
    PaginationComponent,
    TrendingPageComponent,
    SearchPageComponent,
    SearchComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: WebApiClient, useClass: GiphyWebApiClient },
    { provide: GifProvider, useClass: GiphyGifProvider },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
