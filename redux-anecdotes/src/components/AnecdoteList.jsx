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
    /*
    //haetaan kaikki lajiteltuna ja filtteröidään, jos tarve
    let anekdootit = anecdotes.sort(function (a, b) {
      return b.votes - a.votes;
    });
    */
    if (filter === "") {
      return anecdotes;
    }
    return anecdotes.filter((a) => a.content.includes(filter));
  });

  console.log("sorttaus puuttuu nyt");
  /*
  let anekdootit = anecdotes;
  anekdootit.sort((a, b) => b.votes - a.votes);
  console.log("anekdootit", anekdootit);

  
  const getMax = (a, b) => Math.max(a.votes, b.votes);

  console.log("max", anecdotes.reduce(getMax));
  */

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
