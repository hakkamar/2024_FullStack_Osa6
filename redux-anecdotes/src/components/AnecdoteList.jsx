import { useSelector, useDispatch } from "react-redux";
import { addVoteOf } from "../reducers/anecdoteReducer";
import {
  addNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const dispatch = useDispatch();

  const annaVote = (anecdote) => {
    dispatch(addNotification(`You voted '${anecdote.content}'`));
    dispatch(addVoteOf(anecdote));
    setTimeout(() => {
      dispatch(removeNotification());
      //errori = false;
    }, 5000);
  };

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "") {
      return anecdotes;
    }
    return anecdotes.filter((a) => a.content.includes(filter));
  });

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => annaVote(anecdote)}
        />
      ))}
    </div>
  );
};

export default Anecdotes;
