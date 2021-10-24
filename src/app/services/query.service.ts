import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private apollo: Apollo) { }

  getUsers(term: string){
    return this.apollo
      .watchQuery({
        query: gql`
        {
          search(first: 5, type: USER, query: "${term}") {
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
      .valueChanges
  }

  getRepos(term: string){
    return this.apollo
      .watchQuery({
        query: gql`
        {
          search(first: 5, type: REPOSITORY, query: "${term}"){
            repositoryCount,
            nodes{
              ...on Repository{
                nameWithOwner,
                name
              }
            }
          }
        }

        `,
      })
      .valueChanges
  }

}
