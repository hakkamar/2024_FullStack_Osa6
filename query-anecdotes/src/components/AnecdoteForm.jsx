import { createAnecdote } from "../requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });

      //const anecdotes = queryClient.getQueryData({ queryKey: ["anecdotes"] });
      //const anecdotes = queryClient.getQueryData("anecdotes");
      //queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
      /*
      queryClient.setQueryData(
        { queryKey: ["anecdotes"] },
        anecdotes.anecdotes.concat(newAnecdote)
      );
      */
    },
    onError: (error) => {
      let messu = error.response.data.error;
      dispatch({
        type: "addNotification",
        payload: messu,
      });
      setTimeout(() => {
        dispatch({ type: "removeNotification" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(
      { content, votes: 0 },
      {
        onSuccess: () => {
          dispatch({
            type: "addNotification",
            payload: `Created new anecdote '${content}'`,
          });
          setTimeout(() => {
            dispatch({ type: "removeNotification" });
          }, 5000);
        },
      }
    );
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
