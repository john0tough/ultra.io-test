import { AppPage } from './app.po';
import { browser, logging, ElementFinder, protractor, By, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display trending page one as home page', () => {
    expect(page.getTitlePage()).toEqual('Simple Giphy Search');
    expect(page.getCurrentUrl()).toEqual('/trending/1');
  });

  it('should display gif list with nine elements in home page', async () => {
    const listElements = await page.getGifList();
    expect(listElements.length).toEqual(9);
  });

  it('should display pagination with access to first ten pages', async () => {
    const pagination: ElementFinder = await page.getPagination();
    const numberedPages = pagination.all(by.css('.numbered-page'));
    expect((await numberedPages).length).toEqual(10);
  });

  it('should navigate to trending page eight', async () => {
    const pagination: ElementFinder = await page.getPagination();
    const numberedPages = pagination.all(by.css('.numbered-page'));
    const pageNumberIndex = 7;
    await numberedPages.get(pageNumberIndex).click();
    expect(await page.getCurrentUrl()).toEqual('/trending/8');
  });

  it('should navigate to search page by adding two tags in search box', async () => {
    const searchInput = page.getSearchInput();
    const tagOne = 'super';
    const tagTwo = 'mario';
    const enterKey = protractor.Key.ENTER;

    searchInput.sendKeys(tagOne);
    searchInput.sendKeys(enterKey);
    searchInput.sendKeys(tagTwo);
    searchInput.sendKeys(enterKey);
    const tagList = await page.getSearchTagList();
    expect(page.getCurrentUrl()).toEqual(`/search/${tagOne}-${tagTwo}/1`);
    expect(tagList.length).toEqual(2);
  });

  it('should navigate to a new search by removing second tag in search box', async () => {
    const searchInput = page.getSearchInput();
    const tagOne = 'super';
    const tagTwo = 'mario';
    const enterKey = protractor.Key.ENTER;

    searchInput.sendKeys(tagOne);
    searchInput.sendKeys(enterKey);
    searchInput.sendKeys(tagTwo);
    searchInput.sendKeys(enterKey);
    let tagList = await page.getSearchTagList();
    const secondTag = tagList[1];
    await secondTag.element(by.tagName('button')).click();

    tagList = await page.getSearchTagList();
    expect(page.getCurrentUrl()).toEqual(`/search/${tagOne}/1`);
    expect(tagList.length).toEqual(1);
  });

  it('should navigate to home page after remove all tags in search box', async () => {
    const searchInput = page.getSearchInput();
    const tagOne = 'super';
    const tagTwo = 'mario';
    const enterKey = protractor.Key.ENTER;

    searchInput.sendKeys(tagOne);
    searchInput.sendKeys(enterKey);
    searchInput.sendKeys(tagTwo);
    searchInput.sendKeys(enterKey);

    expect(page.getCurrentUrl()).toEqual(`/search/${tagOne}-${tagTwo}/1`);

    let tagList = await page.getSearchTagList();
    let tag = tagList[0];
    await tag.element(by.tagName('button')).click();
    tagList = await page.getSearchTagList();
    tag = tagList[0];
    await tag.element(by.tagName('button')).click();

    expect(page.getCurrentUrl()).toEqual('/trending/1');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
