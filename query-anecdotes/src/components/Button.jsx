import { useNotificationDispatch } from "../NotificationContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnecdote } from "../requests";

const Button = (anecdote) => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = () => {
    updateAnecdoteMutation.mutate({
      ...anecdote.anecdote,
      votes: anecdote.anecdote.votes + 1,
    });

    dispatch({
      type: "addNotification",
      payload: `Anecdote '${anecdote.anecdote.content}' voted`,
    });
    setTimeout(() => {
      dispatch({ type: "removeNotification" });
    }, 5000);
  };

  return <button onClick={() => handleVote(anecdote)}>vote</button>;
};

export default Button;
