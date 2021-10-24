import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router, ParamMap } from '@angular/router'
import { QueryService } from '../../services/query.service'

@Component({
  selector: 'app-results',
  template: `
    <app-navbar></app-navbar>
    <app-search-results [users]="userNodes" [repos]="repoNodes"></app-search-results>
    <app-footer></app-footer>
  `
})

export class SearchResultComponent implements OnInit {
  term$: string = ''

  userNodes: [] = []
  repoNodes: [] = []
  loading = true;
  error = null

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private queryService: QueryService
    ){}

    ngOnInit(){
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.term$ = params.get('term')!;
        console.log(this.term$)
        this.getData()
      })
    }

    getData(){
      this.queryService.getUsers(this.term$, 10).subscribe((result: any) => {
        this.userNodes = result?.data?.search.nodes;
        this.loading = result.loading;
        this.error = result.error;
        console.log(this.userNodes)
      });
      this.queryService.getRepos(this.term$, 10).subscribe((result: any) => {
        this.repoNodes = result?.data?.search.nodes;
        this.loading = result.loading;
        this.error = result.error;
        console.log(this.repoNodes)
      });
    }

}
