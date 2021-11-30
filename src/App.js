import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Home from "./pages/Home"
import Spence from "./pages/Spence"

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/spence">
            <Spence />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
