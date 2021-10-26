import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router, ParamMap } from '@angular/router'

@Component({
  selector: 'app-results',
  template: `
    <app-navbar></app-navbar>
    <app-search-results [term$]="term$"></app-search-results>
    <app-footer></app-footer>
  `
})

export class SearchResultComponent implements OnInit {

  term$:any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    ){}

    ngOnInit(){
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.term$ = params.get('term')!;
        console.log(this.term$)
      })
    }



}
