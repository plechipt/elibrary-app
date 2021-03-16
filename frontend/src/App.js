import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { USER_ME_QUERY } from "./components/Api/users";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/SearchBar/SearchBar";
import Books from "./components/Books/Books";
import UserBooks from "./components/Books/UserBooks";

const App = () => {
  const [user, setUser] = useState("admin");
  const { data: meQuery, loading } = useQuery(USER_ME_QUERY, {
    fetchPolicy: "network-only",
  });

  // Set user to memory
  useEffect(() => {
    if (meQuery && meQuery.me) {
      setUser(meQuery.me.username);
    }
  }, [meQuery]);

  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        {user && loading === false ? (
          <Switch>
            <Route path="/my-books" component={UserBooks} />
            <Route path="/" component={Books} />
          </Switch>
        ) : null}
      </main>
    </div>
  );
};

export default App;
