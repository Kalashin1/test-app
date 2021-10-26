import { Component, Input, OnInit } from "@angular/core";
import { QueryService } from "src/app/services/query.service";

@Component({
  selector: 'app-search-results',
  templateUrl: './results.component.html'
})

export class ResultComponent implements OnInit {
  types = ['user', 'repository']

  constructor(private queryService: QueryService){}

  ngOnInit(){
    this.getData()
  }

  loading = true
  error = false

  @Input() term$:any

  showRepo: boolean = false
  showUser: boolean = true

  displayRepo(){
    this.showUser = false
    this.showRepo = true
  }

  displayUser(){
    this.showUser = true
    this.showRepo = false
  }


  users:any[] = []
  userCount: number = 0;
  userCursors: any[] = []

  repos:any[] = []
  repoCount: number = 0;
  repoCursors: [] = []

 pages = [1, 2, 3, 4, 5]

 paginateRepos(page: number){
  console.log(page)
  this.loading = true
  this.queryService.paginateRepos(this.term$, this.repoCursors[page]).subscribe((result: any) => {
    this.repos =  result?.data?.search.nodes;
    this.loading = result.loading;
    this.error = result.error;
  })
 }

 paginateUsers(page: number){
  this.loading = true
  this.queryService.paginateUsers(this.term$, this.userCursors[page]).subscribe((result: any) => {
    this.users =  result?.data?.search.nodes;
    this.loading = result.loading;
    this.error = result.error;
  })
 }

 getData(){
    this.queryService.getUsers(this.term$, 20).subscribe((result: any) => {
      this.users = result?.data?.search.nodes;
      this.userCount = result?.data.search.userCount
      this.userCursors = result?.data.search.edges.map((cursor: any) => cursor.cursor)
      this.loading = result.loading;
      this.error = result.error;
      // console.log(this.error, this.userCount, this.userCursors)
    });
    this.queryService.getRepos(this.term$, 20).subscribe((result: any) => {
      this.repos = result?.data?.search.nodes;
      this.repoCount = result?.data?.search.repositoryCount
      this.repoCursors = result?.data.search.edges.map((cursor: any) => cursor.cursor)
      this.loading = result.loading;
      this.error = result.error;
      // console.log(this.repoCount, this.repoCursors)
    });
  }

}
