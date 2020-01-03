import { async, ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchComponent } from './search.component';
import { SearchPageComponent } from '../page/search-page.component';
import { MockComponent } from 'ng-mocks';
import { TrendingPageComponent } from '../page/page.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  const mockTrendingPageComponent = MockComponent(TrendingPageComponent);
  const mockSearchPageComponent = MockComponent(SearchPageComponent);
  const activeTags = ['some', 'tags'];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        { path: 'search/:q/:id', component: mockTrendingPageComponent },
        { path: 'trending/1', component: mockSearchPageComponent },

      ])],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
            paramMap: of({ get: (key) => isNaN(Number(key)) === true ? activeTags.join('-') : 1 })
        },
      }],
      declarations: [ SearchComponent, mockTrendingPageComponent, mockSearchPageComponent  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tags from router Params', fakeAsync(() => {
    tick();
    fixture.detectChanges();
    const activeSearchTags = fixture.debugElement.queryAll(By.css('#search-input .tag'));
    activeSearchTags.forEach((element, index) => {
      expect(activeTags.find(str => element.nativeElement.innerText === str)).toBe(activeTags[index]);
    });
  }));

  it('should add new tag from input search value at press "enter" key', fakeAsync(() => {
    tick();
    fixture.detectChanges();
    const newTag = 'other new search tag';
    const inputTag = fixture.debugElement.query(By.css('#search-tag-input'));
    inputTag.nativeElement.value = newTag;
    inputTag.nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    fixture.detectChanges();

    const activeSearchTags = fixture.debugElement.queryAll(By.css('#search-input .tag'));
    const findElement = activeSearchTags.find(item => item.nativeElement.innerText === newTag);
    expect(findElement).toBeTruthy();
  }));

  it('should redirect to new search page after user adds a tag', async(
    inject([Router, Location], (router: Router, location: Location) => {
      const expectedUrl = '/search/some-tags-other%20new%20search%20tag/1';
      const newTag = 'other new search tag';
      const inputTag = fixture.debugElement.query(By.css('#search-tag-input'));
      inputTag.nativeElement.value = newTag;
      inputTag.nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(location.path()).toEqual(expectedUrl);
      });
    })
  ));

  it('should remove element from tag list', fakeAsync(() => {
    tick();
    fixture.detectChanges();
    const newTag = 'other new search tag';
    const inputTag = fixture.debugElement.query(By.css('#search-tag-input'));
    inputTag.nativeElement.value = newTag;
    inputTag.nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    fixture.detectChanges();

    const removeTag = fixture.debugElement.query(By.css('#search-input .tag-container:nth-child(2) .remove-tag'));
    removeTag.nativeElement.click();
    fixture.detectChanges();

    const expectedTags = [].concat(activeTags[0], newTag);
    const activeSearchTags = fixture.debugElement.queryAll(By.css('#search-input .tag'));
    activeSearchTags.forEach((element, index) => expect(element.nativeElement.innerText).toEqual(expectedTags[index]));
  }));

  it('should redirect to new search page after user delete a tag', async(
    inject([Router, Location], (router: Router, location: Location) => {
      const expectedUrl = '/search/tags/1';
      const removeTag = fixture.debugElement.query(By.css('#search-input .tag-container:nth-child(1) .remove-tag'));
      removeTag.nativeElement.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(location.path()).toEqual(expectedUrl);
      });
    })
  ));

  it('should redirect to trending page after user delete all tags', async(
    inject([Router, Location], (router: Router, location: Location) => {
      const expectedUrl = '/trending/1';
      const removeTagsButton = fixture.debugElement.queryAll(By.css('#search-input .remove-tag'));
      removeTagsButton.forEach(removeTag => removeTag.nativeElement.click());
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(location.path()).toEqual(expectedUrl);
        expect(component.tags.length).toEqual(0);
      });
    })
  ));
});
