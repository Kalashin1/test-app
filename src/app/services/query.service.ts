import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private apollo: Apollo) { }

  getUsers(term: string, paginate: number) {
    return this.apollo
      .watchQuery({
        query: gql`
        {
          search(first: ${paginate}, type: USER, query: "${term}") {
            userCount
            edges{
              cursor
            }
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
                repositories {
                  totalCount
                }
                followers {
                  totalCount
                }
                following {
                  totalCount
                }
              }
            }
          }
        }

        `,
      })
      .valueChanges
  }

  getRepos(term: string, paginate: number) {
    return this.apollo
      .watchQuery({
        query: gql`
        {
          search(first: ${paginate}, type: REPOSITORY, query: "${term}"){
            repositoryCount
            edges{
              cursor
            }
            nodes{
              ...on Repository {
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


  paginateRepos(query: string, cursor: string) {
    return this.apollo
      .watchQuery({
        query: gql`
        {
          search(first: 20, type: REPOSITORY, query: "${query}", after: "${cursor}"){
            repositoryCount
            edges{
              cursor
            }
            nodes{
              ...on Repository {
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

  paginateUsers(term: string, cursor: string) {
    return this.apollo
      .watchQuery({
        query: gql`
        {
          search(first: 20, type: USER, query: "${term}", after: "${cursor}") {
            userCount
            edges{
              cursor
            }
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
                repositories {
                  totalCount
                }
                followers {
                  totalCount
                }
                following {
                  totalCount
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
