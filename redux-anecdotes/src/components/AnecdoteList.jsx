import { useSelector, useDispatch } from "react-redux";
import { addVoteOf } from "../reducers/anecdoteReducer";

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

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    //haetaan kaikki lajiteltuna ja filtteröidään, jos tarve
    let anekdootit = anecdotes.sort(function (a, b) {
      return b.votes - a.votes;
    });
    if (filter === "") {
      return anekdootit;
    }
    return anekdootit.filter((a) => a.content.includes(filter));
  });

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(addVoteOf(anecdote.id))}
        />
      ))}
    </div>
  );
};

export default Anecdotes;
