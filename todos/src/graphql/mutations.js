import { gql } from 'apollo-boost';


// Toggle todo status (done/not done)
export const TOGGLE_TODO = gql`
  mutation toggleTodo($id: uuid!, $Done: Boolean!) {
    update_todos(where: {id: {_eq: $id}}, _set: {Done: $Done}) {
      returning {
        Done
        Text
        id
      }
    }
  }
`
//add TODO

export const ADD_TODO = gql`
  mutation addTodo($Text:String!) {
      insert_todos(objects: {Text: $Text}) {
        returning {
          id
          Text
          Done
        }
      }
    }
`
// delete TODO
export const DELETE_TODO = gql`
  mutation deleteTodos($id: uuid!) {
    delete_todos(where: {id: {_eq: $id}}) {
      returning {
        id
        Text
        Done
      }
    }
  }
`
