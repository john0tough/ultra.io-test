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

    const initServices = (): void => {
        mockImageProviderService.provide.and.callFake((resource) => {
            const image = new Image();
            image.src = resource.src;
            image.title = resource.title;
            image.className = 'img-test';
            imgArray = [].concat(...imgArray, image);
            return image;
        });
    };

    beforeEach(async(() => {
        initServices();
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

    it('should show loading message when loading is active and keep hide card-list element', () => {
        const expectedMessage = 'Loading...';

        component.isLoadingContent = true;
        fixture.detectChanges();

        const loadingMessage = fixture.debugElement.query(By.css('#loading-msessage'));
        const cardList = fixture.debugElement.query(By.css('#card-list'));

        expect(loadingMessage.nativeElement.innerHTML).toEqual(expectedMessage);
        expect(cardList.styles.display).toEqual('none');
    });

    it('should show card-list with images, and hide loading-message when receive a gifArray', async () => {
        const gifArray = [
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
        ];

        const images$ = cold('-a|', {
            a: gifArray
        });

        component.imageList = images$;

        getTestScheduler().flush();
        imgArray.forEach(img => img.dispatchEvent(new Event('load')));
        getTestScheduler().flush();
        fixture.detectChanges();

        const cardList = fixture.debugElement.query(By.css('#card-list'));
        const loadingMessage = fixture.debugElement.query(By.css('#loading-msessage'));

        expect([...cardList.nativeElement.querySelectorAll('img.img-test')].length).toEqual(gifArray.length);
        expect(loadingMessage).toBeFalsy();
    });
});
