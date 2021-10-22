import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test-app';

  nodes: any[] = [];
  loading = true;
  error: any;

  constructor(private apollo: Apollo){}

  ngOnInit(){
    this.apollo
      .watchQuery({
        query: gql`
        {
          search(first: 5, type: USER, query: "") {
            userCount
            nodes {
              ... on User {
                name
                id
                email
                url
                avatarUrl
                followers {
                  totalCount
                }
                following {
                  totalCount
                }
                starredRepositories {
                  totalCount
                }
                repositories(first: 2, privacy: PUBLIC) {
                  edges {
                    node {
                      id
                      name
                      url
                    }
                  }
                }
              }
            }
          }
        }

        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.nodes = result?.data?.search.nodes;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}
