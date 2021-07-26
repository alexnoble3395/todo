import React from 'react';

// list todos
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_TODOS } from './graphql/queries';


// MUTATIONS
 // create todos
import { ADD_TODO } from './graphql/mutations';
 // delete todos
import { DELETE_TODO } from './graphql/mutations';
 // update todos by toggling done status from false to true
import { TOGGLE_TODO } from './graphql/mutations';
// material ui, figma, storybook, nextjs, mixpanel, darkly

import {CircularProgress} from '@material-ui/core';

function App() {
// hooks
  const { data, loading, error } = useQuery(GET_TODOS);
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [addTodo] = useMutation(ADD_TODO);
    const [deleteTodos] = useMutation(DELETE_TODO);

// state and local variables
  const [userInput, setUserInput] = React.useState('');

// local functions
    async function handleAddTodo(event) {
      event.preventDefault();
      if (!userInput.trim()) return;
      const variables = {
        Text: userInput
      }
      await addTodo({ variables,
        refetchQueries: [
          { query: GET_TODOS }
        ]
      });
      setUserInput('');
    }
    async function handleToggleTodo({ id, Done }){
      const variables = {
        id,
        Done: !Done
      }
      await toggleTodo({variables})
    }
    async function handleDeleteTodo({ id }) {
      const isConfirmed = window.confirm("Are you sure you want to delete this item?");
      if (isConfirmed) {
          const variables = {
            id
          }
          await deleteTodos({ variables,
            update: cache => {
              const prevData = cache.readQuery({ query: GET_TODOS });
              const newData = prevData.todos.filter(todos => todos.id !== id);
              cache.writeQuery({ query: GET_TODOS, data: { todos: newData }});
            }
          });
      }
    }

// returned values

  if (loading) {
    return(
      <div>
          <CircularProgress />
      </div>
    )
  }

  if (error) { console.error(error);
    return <div>{error.message}</div> }
  console.log(data)


  return (
    <div className="vh-100 code flex flex-column items-center bg-green white pa3 fl-1">
      <h1 className="f2-l"> GraphQL Checklist</h1>
      <form className="mb3" onSubmit={handleAddTodo} >
        <input
        className="pa1 f4"
        type="text"
        placeholder="Add a Todo"
        onChange={(event) => setUserInput(event.target.value)}
        value={userInput}
         />
        <button className="pa1 ml2 br2 f4" type="submit">Create a Todo</button>
      </form>
      <div className="flex items-center justify-center flex-column" style={{overflowY: 'scroll'}}>
      {
        data.todos.map(todos => (
          <p key={todos.id} onDoubleClick={() => handleToggleTodo(todos)}>
            <span className={`pointer list pa1 f3 ${todos.Done && "strike"}`}>{todos.Text}</span>
            <button className="bg-transparent bn f4" onClick={() => handleDeleteTodo(todos)}>
              <span className="red">
                &times;
              </span></button>
          </p>
        ))
      }
      </div>
    </div>
  );
}

export default App;
