import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Renderer2 } from '@angular/core';
import { GifListComponent } from './gif-list.component';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { By } from '@angular/platform-browser';
import { GifModel } from '../shared/contracts/gif.model';
import { ImageProvider } from '../shared/contracts/image-provider.service';
describe('GifListComponent', () => {

    let component: GifListComponent;
    let fixture: ComponentFixture<GifListComponent>;
    const mockImageProviderService = jasmine.createSpyObj<ImageProvider<GifModel>>('ImageProvider', ['provide']);
    let imgArray: HTMLImageElement[] = [];
    beforeEach(async(() => {
        mockImageProviderService.provide.and.callFake((resource) => {
            const image = new Image();
            image.src = resource.src;
            image.title = resource.title;
            imgArray = [].concat(...imgArray, image);
            return image;
        });
        TestBed.configureTestingModule({
            providers: [
                Renderer2,
                { provide: ImageProvider, useValue: mockImageProviderService }
            ],
            declarations: [GifListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GifListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    fit('load images', () => {
        const images$ = cold('-a|', {
            a: [
                {
                    url: 'urlOne',
                    title: 'titleOne',
                    src: 'imageUrlOne'
                },
                {
                    url: 'urlTwo',
                    title: 'titleTwo',
                    src: 'imageUrlTwo'
                },
                {
                    url: 'urlThree',
                    title: 'titleThree',
                    src: 'imageUrlThree'
                },
                {
                    url: 'urlFour',
                    title: 'titleFour',
                    src: 'imageUrlFour'
                },
                {
                    url: 'urlFive',
                    title: 'titleFive',
                    src: 'imageUrlFive'
                }
            ]
        });
        component.imageList = images$;
        getTestScheduler().flush();
        imgArray.forEach(img => img.dispatchEvent(new Event('load')));

        fixture.detectChanges();
        getTestScheduler().flush();
        const cardList = fixture.debugElement.query(By.css('#card-list'));
        console.log(cardList)
    });
});
