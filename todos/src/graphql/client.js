import ApolloClient from 'apollo-boost';
import { GET_TODOS } from './queries';
import { gql } from 'apollo-boost';



const client = new ApolloClient({
  uri: 'https://famous-doe-63.hasura.app/v1/graphql',

  headers: {
        'x-hasura-admin-secret': "fN3VfabQNJ36RQJTDtBvoql5J6THZgwpctd02U0IIGp5LwB3e7r588Wh6Uht54cE",
      },
});

client.query({
  query: gql`
    query getTodos {
      todos {
          Done
          id
          Text
      }
  }
  `
})

export default client;
