import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { USER_ME_QUERY } from "./components/Api/users";
import { Route, Switch } from "react-router-dom";
import { MessageContext } from "./components/Contexts/MessageContext";
import { MessageContentContext } from "./components/Contexts/MessageContentContext";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Books from "./components/Books/Books";
import Message from "./components/Message/Message";
import UserBooks from "./components/Books/UserBooks";
import BottomOfPage from "./components/BottomOfPage/BottomOfPage";

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

  const [messageContent, setMessageContent] = useState("false");
  const messageContentValue = useMemo(
    () => ({ messageContent, setMessageContent }),
    [messageContent, setMessageContent]
  );

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
          <MessageContext.Provider value={showMessageValue}>
            <MessageContentContext.Provider value={messageContentValue}>
              <Message />
              <Switch>
                <Route path="/my-books" component={UserBooks} />
                <Route path="/">
                  <Books />
                </Route>
                <Route component={Message} />
              </Switch>
            </MessageContentContext.Provider>
          </MessageContext.Provider>
        ) : null}
      </main>
      <footer>
        <BottomOfPage />
      </footer>
    </div>
  );
};

export default App;
