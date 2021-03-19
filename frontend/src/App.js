import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { USER_ME_QUERY } from "./components/Api/users";
import { Route, Switch } from "react-router-dom";
import { MessageContext } from "./components/MessageContext";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Books from "./components/Books/Books";
import Message from "./components/Message/Message";
import UserBooks from "./components/Books/UserBooks";

const App = () => {
  const [user, setUser] = useState("admin");
  const { data: meQuery, loading } = useQuery(USER_ME_QUERY, {
    fetchPolicy: "network-only",
  });

  const [showMessage, setShowMessage] = useState(false);
  const showMessageValue = useMemo(() => ({ showMessage, setShowMessage }), [
    showMessage,
    setShowMessage,
  ]);

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
            <MessageContext.Provider value={showMessageValue}>
              <Route path="/">
                <Message />
                <Books />
              </Route>
              <Route component={Message} />
            </MessageContext.Provider>
          </Switch>
        ) : null}
      </main>
    </div>
  );
};

export default App;
