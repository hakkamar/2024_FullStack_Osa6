import { createSlice } from "@reduxjs/toolkit";

import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVoteOf(state, action) {
      //console.log(JSON.parse(JSON.stringify(state)));
      const id = action.payload.id;
      const anecdoteToChange = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: action.payload.votes,
      };
      let sortatutAnekdootit = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
      sortatutAnekdootit.sort((a, b) => b.votes - a.votes);

      return sortatutAnekdootit;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const updateAnecdote = (anecdote) => {
  const id = anecdote.id;
  const changedAnecdote = {
    content: anecdote.content,
    votes: anecdote.votes + 1,
    id: id,
  };

  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(id, changedAnecdote);
    dispatch(addVoteOf(updatedAnecdote));
  };
};

export const { addVoteOf, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
