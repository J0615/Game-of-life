import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

function QueryParamsDemo() {
  let query = useQuery();

  return (
    <div>
      <div>
        <Child column={query.get("column")} row={query.get("row")} />
      </div>
    </div>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Child({ column, row }) {
  return <div></div>;
}

export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Start</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <hr />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/app">
            {<QueryParamsDemo />}
            {<App />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function doIt() {
  let column = document.getElementById("columns").value;
  let row = document.getElementById("rows").value;
  if (column < 10 || column > 100 || row < 10 || row > 100) {
    alert("Invalid Input, rows and columns in range from 10 to 100 inclusive");
  } else {
    let newURL =
      window.location.protocol + "//" + window.location.host + "/app";
    let myURL = new URL(newURL);

    myURL.searchParams.append("column", column);
    myURL.searchParams.append("row", row);
    console.log(myURL);
    window.location.href = myURL;
  }
}

function Home() {
  return (
    <div className="main">
      <h2>Welcome to Conway's game of life!</h2>
      <br />
      <br />
      <label htmlFor="rows">Rows:</label>
      <input type="number" id="rows" name="rows" />
      <br />
      <br />
      <label htmlFor="columns">Columns:</label>
      <input type="number" id="columns" name="rows" />
      <br />
      <br />
      <button type="submit" onClick={doIt}>
        Continue
      </button>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
      <p>
        Life has 4 simple rules:
        <br />
        A living cell with less than two living neighbours dies.
        <br />
        A living cell with two or three live neighbours lives.
        <br />
        A living cell with more than three live neighbours dies.
        <br />A dead cell with exactly three live neighbours becomes a live
        cell, as if by reproduction.
      </p>
    </div>
  );
}

ReactDOM.render(<BasicExample />, document.getElementById("root"));
