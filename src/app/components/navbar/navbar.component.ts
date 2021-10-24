import { Component, Input, OnInit } from '@angular/core';

@Component({
  templateUrl: './navbar.component.html',
  selector: 'app-navbar'
})
export class NavbarComponent implements OnInit {

  constructor(){}

  ngOnInit(){
    this.navs = ['user', 'repository', 'code']
    console.log(this.navs)
  }

 navs:string[] = []
}
