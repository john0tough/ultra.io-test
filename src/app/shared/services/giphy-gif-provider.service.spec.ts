import { WebApiClient } from '../contracts/http-client';
import { GiphyGifProvider } from './giphy-gif-provider.service';
import { cold } from 'jasmine-marbles';

describe('GiphyGifProvider', () => {
    it('Should be created', () => {
        const provider = jasmine.createSpyObj<WebApiClient>('WebApiClient', ['get']);
        const service = new GiphyGifProvider(provider);
        expect(service).toBeTruthy();
    });

    it('Should make trending request', () => {
        const provider = jasmine.createSpyObj<WebApiClient>('WebApiClient', ['get']);

        const expectedResponse = cold('--b|', {
            b: {
                gifs: [{
                    url: 'originalUrlimageOne',
                    title: 'titleImageOne',
                    src: 'imageUrlOne'
                }, {
                    url: 'originalUrlimageTwo',
                    title: 'titleImageTwo',
                    src: 'imageUrlTwo'
                }, {
                    url: 'originalUrlimageThree',
                    title: 'titleImageTwo',
                    src: 'imageUrlThree'
                }],
                pagination: {
                    totalElements: 3,
                    totalPages: 1,
                    pageSize: 3,
                    pageNumber: 1,
                }
            }
        });

        const serviceResponse = cold('--a|', {
            a: {
                data: [{
                    images: {
                        fixed_width: {
                            url: 'imageUrlOne'
                        }
                    } ,
                    title: 'titleImageOne',
                    url: 'originalUrlimageOne'
                }, {
                    images: {
                        fixed_width: {
                            url: 'imageUrlTwo'
                        }
                    } ,
                    title: 'titleImageTwo',
                    url: 'originalUrlimageTwo'
                }, {
                    images: {
                        fixed_width: {
                            url: 'imageUrlThree'
                        }
                    } ,
                    title: 'titleImageTwo',
                    url: 'originalUrlimageThree'
                }],
                pagination: {
                    offset: 0,
                    total_count: 3
                }
            }
        });

        provider.get.and.returnValue(serviceResponse);

        const service = new GiphyGifProvider(provider);
        const pageSize = 3;
        const pageNumber = 1;

        const response = service.trending(pageSize, pageNumber);
        expect(response).toBeObservable(expectedResponse);
    });

    it('Should make search request', () => {
        const provider = jasmine.createSpyObj<WebApiClient>('WebApiClient', ['get']);

        const expectedResponse = cold('--b|', {
            b: {
                gifs: [{
                    url: 'originalUrlimageOne',
                    title: 'titleImageOne',
                    src: 'imageUrlOne'
                }, {
                    url: 'originalUrlimageTwo',
                    title: 'titleImageTwo',
                    src: 'imageUrlTwo'
                }, {
                    url: 'originalUrlimageThree',
                    title: 'titleImageTwo',
                    src: 'imageUrlThree'
                }],
                pagination: {
                    totalElements: 3,
                    totalPages: 1,
                    pageSize: 3,
                    pageNumber: 1,
                }
            }
        });

        const serviceResponse = cold('--a|', {
            a: {
                data: [{
                    images: {
                        fixed_width: {
                            url: 'imageUrlOne'
                        }
                    } ,
                    title: 'titleImageOne',
                    url: 'originalUrlimageOne'
                }, {
                    images: {
                        fixed_width: {
                            url: 'imageUrlTwo'
                        }
                    } ,
                    title: 'titleImageTwo',
                    url: 'originalUrlimageTwo'
                }, {
                    images: {
                        fixed_width: {
                            url: 'imageUrlThree'
                        }
                    } ,
                    title: 'titleImageTwo',
                    url: 'originalUrlimageThree'
                }],
                pagination: {
                    offset: 0,
                    total_count: 3
                }
            }
        });

        provider.get.and.returnValue(serviceResponse);

        const service = new GiphyGifProvider(provider);
        const pageSize = 3;
        const pageNumber = 1;
        const request = ['tag1', 'tag2', 'tag3'];

        const response = service.search(request, pageSize, pageNumber);
        expect(response).toBeObservable(expectedResponse);
    });
});
