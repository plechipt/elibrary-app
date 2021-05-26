import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { USER_ME_QUERY } from "./components/Api/users";
import { Route, Switch } from "react-router-dom";

import { UserContext } from "./components/Contexts/UserContext";
import { MessageContext } from "./components/Contexts/MessageContext";
import { MessageContentContext } from "./components/Contexts/MessageContentContext";
import { ShowCreateModalContext } from "./components/Contexts/ShowCreateModalContext";
import { getThemeMode } from "./components/functions";
import "./App.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import RestrictedRoute from "./components/Other/RestrictedRoute";
import ScrollToTop from "./components/Other/ScrollToTop";

import Navbar from "./components/Navbar/Navbar";
import BorrowedBooks from "./components/BorrowedBooks/BorrowedBooks";
import Users from "./components/Users/Users";
import Books from "./components/Books/Books";
import Message from "./components/Message/Message";
import UserBooks from "./components/Books/UserBooks";
import BottomOfPage from "./components/BottomOfPage/BottomOfPage";
import SignIn from "./components/Authentication/Login";
import SignUp from "./components/Authentication/Register";

const App = () => {
  //const [user, setUser] = useState({ username: "admin1", isSuperuser: true });
  const [user, setUser] = useState(null);
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const { data: meQuery, loading } = useQuery(USER_ME_QUERY, {
    fetchPolicy: "network-only",
  });

  const [showMessage, setShowMessage] = useState(false);
  const showMessageValue = useMemo(
    () => ({ showMessage, setShowMessage }),
    [showMessage, setShowMessage]
  );

  const [messageContent, setMessageContent] = useState("false");
  const messageContentValue = useMemo(
    () => ({ messageContent, setMessageContent }),
    [messageContent, setMessageContent]
  );

  const [showCreateModal, setShowCreateModal] = useState();
  const showCreateModalValue = useMemo(
    () => ({ showCreateModal, setShowCreateModal }),
    [showCreateModal, setShowCreateModal]
  );

  const [darkMode, setDarkMode] = useState(getThemeMode());
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkMode ? "dark" : "light",
          primary: {
            main: "#1976D2",
          },
        },
      }),
    [darkMode]
  );

  // Set user to memory
  useEffect(() => {
    if (meQuery && meQuery.me) {
      setUser(meQuery.me);
    }
  }, [meQuery]);

  // Set new theme mode to local storage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className="App">
      <ScrollToTop />
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={userValue}>
          <ShowCreateModalContext.Provider value={showCreateModalValue}>
            <CssBaseline />
            <header>
              {user && loading === false ? (
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
              ) : null}
            </header>
            <main>
              {user && loading === false ? (
                <MessageContext.Provider value={showMessageValue}>
                  <MessageContentContext.Provider value={messageContentValue}>
                    <Message />
                    <Switch>
                      <RestrictedRoute
                        path="/users"
                        forSuperUser={true}
                        component={Users}
                      />
                      <RestrictedRoute
                        path="/borrowed-books"
                        forSuperUser={true}
                        component={BorrowedBooks}
                      />
                      <RestrictedRoute
                        path="/my-books"
                        forSuperUser={false}
                        component={UserBooks}
                      />
                      <Route path="/" component={Books} />
                      <Route component={Message} />
                    </Switch>
                  </MessageContentContext.Provider>
                </MessageContext.Provider>
              ) : (
                <>
                  {loading === false ? (
                    <Switch>
                      <Route
                        path="/register"
                        component={() => <SignUp user={user} />}
                      />
                      <Route
                        path="/"
                        component={() => <SignIn user={user} />}
                      />
                    </Switch>
                  ) : null}
                </>
              )}
            </main>
            <footer>
              <BottomOfPage />
            </footer>
          </ShowCreateModalContext.Provider>
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
