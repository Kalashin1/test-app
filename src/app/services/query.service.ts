import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private apollo: Apollo) { }

  getUsers(term: string, paginate: number){
    return this.apollo
      .watchQuery({
        query: gql`
        {
          search(first: ${paginate}, type: USER, query: "${term}") {
            userCount
            nodes {
              ... on User {
                name
                id
                login
                email
                location
                bio
                url
                avatarUrl
              }
            }
          }
        }

        `,
      })
      .valueChanges
  }

  getRepos(term: string, paginate: number){
    return this.apollo
      .watchQuery({
        query: gql`
        {
          search(first: ${paginate}, type: REPOSITORY, query: "${term}"){
            repositoryCount,
            nodes{
              ...on Repository{
                description
                nameWithOwner
                stargazerCount
                url
                updatedAt
                licenseInfo {
                  name
                }
                primaryLanguage {
                  color
                  name
                }
              }
            }
          }
        }

        `,
      })
      .valueChanges
  }

}
