import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import Button from "./components/Button";

import { useQuery } from "@tanstack/react-query";
import { getAnecdotes } from "./requests";

const App = () => {
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: true,
    retry: 1,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return (
      <span>
        Anecdote Service not available due to problems in server, Error:{" "}
        {result.error.message}
      </span>
    );
  }
  //console.log(JSON.parse(JSON.stringify(result)));

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <Button anecdote={anecdote}></Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
