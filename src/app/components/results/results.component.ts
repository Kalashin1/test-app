
import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-search-results',
  templateUrl: './results.component.html'
})

export class ResultComponent {
  types = ['user', 'repository']



  constructor(){

  }

  showRepo: boolean = true
  showUser: boolean = false

  displayRepo(){
    this.showUser = false
    this.showRepo = true
  }

  displayUser(){
    this.showUser = true
    this.showRepo = false
  }


  @Input() users:any
  @Input() repos:any

 pages = [1, 2, 3, 4, 5]

 paginateRepos(page: number){

 }

 paginateUsers(page: number){

}

}
