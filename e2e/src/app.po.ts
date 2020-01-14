import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitlePage() {
    return this.elementSelector('app-root #page-title').getText() as Promise<string>;
  }

  getGifList() {
    return this.waitElementSelection(this.elementsSelector('#card-list .card'));
  }

  getPagination() {
    return this.waitElementSelection(this.elementSelector('#paginator')) as Promise<ElementFinder>;
  }

  getSearchInput() {
    return this.elementSelector('#search-tag-input');
  }

  getSearchTagList() {
    return this.waitElementSelection(this.elementsSelector('#search-input .tag-container'));
  }

  getCurrentUrl() {
    return browser.getCurrentUrl().then(url => url.replace(browser.baseUrl.slice(0, -1), ''));
  }

  private elementsSelector = (selector: string) => element.all(by.css(selector));

  private elementSelector = (selector: string) => element(by.css(selector));

  private waitElementSelection = (elementsSelection: ElementArrayFinder | ElementFinder) => browser.wait(() => {
    return elementsSelection.isPresent();
  }).then(() => elementsSelection ) as Promise<ElementFinder | ElementArrayFinder>
}
