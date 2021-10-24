import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-search',
  templateUrl: "./search.component.html"
})
export class SearchComponent {

  searchTerm: string = ''

  constructor(private router: Router){}

  submitForm(){
    console.log(this.searchTerm)
    this.router.navigate(['/search-result', this.searchTerm])
  }

}
