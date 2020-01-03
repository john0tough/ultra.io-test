import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  tags: string[] = [];
  private keyEnter = 'Enter';
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('q') !== null ? params.get('q').split('-') : [] )
    ).subscribe(tags => this.tags = tags);
  }

  onKey(event: KeyboardEvent) {
    event.preventDefault();
    if (event.key === this.keyEnter) {
      const input = event.target as HTMLInputElement;
      this.tags = (this.tags.findIndex(item => item === input.value) < 0) ? this.tags.concat(input.value) : this.tags;
      input.value = '';

      this.newSearch(this.tags);
    }
  }

  onTagRemove(tag: string) {
    this.tags = this.tags.filter(item => item !== tag);
    this.newSearch(this.tags);
  }

  onSearch() {
    this.newSearch(this.tags);
  }

  private newSearch(tags: string[]) {
      const query = tags.join('-');
      if (query.length > 0) {
        this.router.navigate(['search', query, '1']);
      } else {
        this.router.navigate(['trending', '1']);
      }
  }
}
