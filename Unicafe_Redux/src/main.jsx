import React from "react";
import ReactDOM from "react-dom/client";

// createStore -> configureStore otetaan myöhemmin käyttöön...
import { createStore } from "redux";
import counterReducer from "./reducer";

const store = createStore(counterReducer);

store.subscribe(() => {
  const storeNow = store.getState();
  console.log("storeNow ", storeNow);
});

const App = () => {
  const klikkaus = (nappi) => () => {
    //console.log("klikattu nappia ", nappi);
    store.dispatch({ type: nappi });
  };

  const zero = () => {
    store.dispatch({
      type: "ZERO",
    });
  };

  return (
    <div>
      <h2>anna palautetta</h2>
      <button onClick={klikkaus("GOOD")}>good</button>
      <button onClick={klikkaus("OK")}>ok</button>
      <button onClick={klikkaus("BAD")}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
