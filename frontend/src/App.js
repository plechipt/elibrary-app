import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/SearchBar/SearchBar";
import Books from "./components/Books/Books";
import UserBooks from "./components/Books/UserBooks";

const App = () => {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <Switch>
          <Route path="/my-books" component={UserBooks} />
          <Route path="/">
            <>
              <SearchBar />
              <Books />
            </>
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default App;
