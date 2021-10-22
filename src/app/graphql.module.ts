import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache, ApolloLink } from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';

const uri = 'https://api.github.com/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  const basic = setContext((operation, context) => ({
    headers: {
      Authorization: 'Bearer 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'
    }
  }));


  return {
    link: ApolloLink.from([ basic, httpLink.create({uri}) ]),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
