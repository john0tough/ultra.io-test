import { PaginationComponent } from './pagination.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { cold } from 'jasmine-marbles';

describe('PaginationComponent', () => {
    let component: PaginationComponent;
    let fixture: ComponentFixture<PaginationComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([
                // { path: 'search/:q/:id', component: mockTrendingPageComponent },
                // { path: 'trending/1', component: mockSearchPageComponent },
            ])],
            declarations: [PaginationComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaginationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should get current page from pageNumber value', () => {
        const currentPage = 2;
        const paginationInfo = {
            totalElements: 1000,
            totalPages: 100,
            pageSize: 10,
            pageNumber: currentPage
        };
        const paging$ = cold('-a|', {
            a: paginationInfo
        });
        const expectedCurrentPage$ = cold('-a|', {
            a: currentPage
        });

        component.paging = paging$;
        expect(component.currentPage$).toBeObservable(expectedCurrentPage$);
    });

    it('Should get total pages', () => {
        const totalPagesNumber = 100;
        const paginationInfo = {
            totalElements: 1000,
            totalPages: totalPagesNumber,
            pageSize: 10,
            pageNumber: 1
        };
        const paging$ = cold('-a|', {
            a: paginationInfo
        });
        const expectedTotalPage$ = cold('-a|', {
            a: totalPagesNumber
        });

        component.paging = paging$;
        expect(component.totalPages$).toBeObservable(expectedTotalPage$);
    });

    it('Should calculate next page when current page is in middle of first and last page', () => {
        const currentPage = 2;
        const paginationInfo = {
            totalElements: 1000,
            totalPages: 100,
            pageSize: 10,
            pageNumber: currentPage
        };

        const paging$ = cold('-a|', {
            a: paginationInfo
        });

        const expectedNextPage$ = cold('-a|', {
            a: currentPage + 1
        });

        component.paging = paging$;
        expect(component.nextPage$).toBeObservable(expectedNextPage$);
    });
    it('Should calculate next page when current page is last page as equal to currentPage', () => {
        const currentPage = 100;
        const paginationInfo = {
            totalElements: 1000,
            totalPages: currentPage,
            pageSize: 10,
            pageNumber: currentPage
        };

        const paging$ = cold('-a|', {
            a: paginationInfo
        });

        const expectedNextPage$ = cold('-a|', {
            a: currentPage
        });

        component.paging = paging$;
        expect(component.nextPage$).toBeObservable(expectedNextPage$);
    });
    it('Should calculate previus page when current page is in middle of first and last page', () => {
        const currentPage = 2;
        const paginationInfo = {
            totalElements: 1000,
            totalPages: 100,
            pageSize: 10,
            pageNumber: currentPage
        };

        const paging$ = cold('-a|', {
            a: paginationInfo
        });

        const expectedPreviusPage$ = cold('-a|', {
            a: currentPage - 1
        });

        component.paging = paging$;
        expect(component.prevPage$).toBeObservable(expectedPreviusPage$);
    });

    it('Should calculate previus page when current page is first page as equal to Current Page', () => {
        const currentPage = 1;
        const paginationInfo = {
            totalElements: 1000,
            totalPages: 100,
            pageSize: 10,
            pageNumber: currentPage
        };

        const paging$ = cold('-a|', {
            a: paginationInfo
        });

        const expectedPreviusPage$ = cold('-a|', {
            a: currentPage
        });

        component.paging = paging$;
        expect(component.prevPage$).toBeObservable(expectedPreviusPage$);
    });

    it('Should calculate page list when totalPages is bigger tan ten and pageNumber is one', () => {
        const paginationInfo = {
            totalElements: 1000,
            totalPages: 100,
            pageSize: 10,
            pageNumber: 1
        };

        const paging$ = cold('-a|', {
            a: paginationInfo
        });
        const expectedPageList$ = cold('-a|', {
            a: [
                { page: 1, isCurrentPage: true },
                { page: 2, isCurrentPage: false },
                { page: 3, isCurrentPage: false },
                { page: 4, isCurrentPage: false },
                { page: 5, isCurrentPage: false },
                { page: 6, isCurrentPage: false },
                { page: 7, isCurrentPage: false },
                { page: 8, isCurrentPage: false },
                { page: 9, isCurrentPage: false },
                { page: 10, isCurrentPage: false }
            ]
        });

        component.paging = paging$;
        expect(component.pageList$).toBeObservable(expectedPageList$);
    });

    it('Should calculate page list when totalPages is minor than ten and pageNumber is one', () => {
        const paginationInfo = {
            totalElements: 35,
            totalPages: 4,
            pageSize: 10,
            pageNumber: 1
        };

        const paging$ = cold('-a|', {
            a: paginationInfo
        });
        const expectedPageList$ = cold('-a|', {
            a: [
                { page: 1, isCurrentPage: true },
                { page: 2, isCurrentPage: false },
                { page: 3, isCurrentPage: false },
                { page: 4, isCurrentPage: false }
            ]
        });

        component.paging = paging$;
        expect(component.pageList$).toBeObservable(expectedPageList$);
    });

    // tslint:disable-next-line: max-line-length
    it('Should position current page flag in position six within page list when page number is minor than total pages minus four and bigger than six', () => {
        const currentPage = 17;
        const paginationInfo = {
            totalElements: 1000,
            totalPages: 100,
            pageSize: 10,
            pageNumber: currentPage
        };

        const paging$ = cold('-a|', {
            a: paginationInfo
        });

        const expectedPageList$ = cold('-a|', {
            a: [
                { page: currentPage - 5, isCurrentPage: false },
                { page: currentPage - 4, isCurrentPage: false },
                { page: currentPage - 3, isCurrentPage: false },
                { page: currentPage - 2, isCurrentPage: false },
                { page: currentPage - 1, isCurrentPage: false },
                { page: currentPage, isCurrentPage: true },
                { page: currentPage + 1, isCurrentPage: false },
                { page: currentPage + 2, isCurrentPage: false },
                { page: currentPage + 3, isCurrentPage: false },
                { page: currentPage + 4, isCurrentPage: false },
            ]
        });

        component.paging = paging$;
        expect(component.pageList$).toBeObservable(expectedPageList$);
    });

    it('Should position current page flag in position nine within page list when page number value is total pages minus one', () => {
        const totalPagesNumber = 100;
        const currentPage = totalPagesNumber - 1;
        const paginationInfo = {
            totalElements: 1000,
            totalPages: totalPagesNumber,
            pageSize: 10,
            pageNumber: currentPage
        };

        const paging$ = cold('-a|', {
            a: paginationInfo
        });

        const expectedPageList$ = cold('-a|', {
            a: [
                { page: currentPage - 8, isCurrentPage: false },
                { page: currentPage - 7, isCurrentPage: false },
                { page: currentPage - 6, isCurrentPage: false },
                { page: currentPage - 5, isCurrentPage: false },
                { page: currentPage - 4, isCurrentPage: false },
                { page: currentPage - 3, isCurrentPage: false },
                { page: currentPage - 2, isCurrentPage: false },
                { page: currentPage - 1, isCurrentPage: false },
                { page: currentPage, isCurrentPage: true },
                { page: currentPage + 1, isCurrentPage: false }
            ]
        });

        component.paging = paging$;
        expect(component.pageList$).toBeObservable(expectedPageList$);
    });
});
