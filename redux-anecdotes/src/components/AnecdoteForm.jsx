import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  addNotification,
  removeNotification,
} from "../reducers/notificationReducer";

import anecdoteService from "../services/anecdotes";

const NewAnecdote = (props) => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.newAnecdote.value;
    event.target.newAnecdote.value = "";

    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
    //dispatch(createAnecdote(content));
    dispatch(addNotification(`Created anecdote '${content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
      //errori = false;
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewAnecdote;
