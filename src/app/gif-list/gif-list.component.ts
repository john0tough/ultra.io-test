import { Component, Input, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { GifModel } from '../shared/contracts/gif.model';
import { Observable, fromEvent, from, of } from 'rxjs';
import { map, flatMap, scan, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-gif-list',
  templateUrl: './gif-list.component.html',
  styleUrls: ['./gif-list.component.css']
})
export class GifListComponent {
  @ViewChild('cardColumns', { static: false }) divContainer: ElementRef;
  @Input('gifs') set imageList(list$: Observable<GifModel[]>) {
    this.getListElements(list$);
  }

  isLoadingContent = false;

  constructor(private renderer: Renderer2) {}

  private getListElements(gifs$: Observable<GifModel[]>): void {
    gifs$
      .pipe(
        tap(() => this.toogleLoadingMessage()),
        flatMap(elements =>
          elements.length === 0
            ? of([])
            : from(
                elements.map(item => {
                  const img = new Image();
                  img.src = item.src;
                  img.classList.add('card-img-top');
                  img.alt = item.title;
                  return fromEvent(img, 'load').pipe(map(event => event.target as HTMLImageElement));
                })
              ).pipe(
                flatMap(item => item),
                scan<HTMLImageElement>((acc, val) => [...acc, val], []),
                filter(array => array.length === elements.length)
              )
        )
      )
      .subscribe(images => {
        this.toogleLoadingMessage();
        this.cleanList();
        this.addElementsToList(images);
      });
  }

  private cleanList(): void {
    const prevDiv = this.divContainer.nativeElement.firstElementChild;
    if (prevDiv !== null) {
      this.renderer.removeChild(this.divContainer.nativeElement, prevDiv);
    }
  }

  private addElementsToList(images: HTMLImageElement[]): void {
    const divContent = this.renderer.createElement('div');
    this.renderer.appendChild(this.divContainer.nativeElement, divContent);
    if (images.length > 0) {
      images.forEach(image => {
        const divCard: HTMLDivElement = this.renderer.createElement('div');
        divCard.classList.add('card');
        this.renderer.appendChild(divCard, image);
        this.renderer.appendChild(divContent, divCard);
      });
    } else {
      const message = this.renderer.createText('No Elementes were founded, please try again');
      this.renderer.appendChild(divContent, message);
    }
  }

  private toogleLoadingMessage(): void {
    this.isLoadingContent = !this.isLoadingContent;
  }
}
