import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { USER_ME_QUERY } from "./components/Api/users";
import { Route, Switch } from "react-router-dom";
import { LanguageContext } from "./components/Contexts/LanguageContext";
import { MessageContext } from "./components/Contexts/MessageContext";
import { MessageContentContext } from "./components/Contexts/MessageContentContext";
import { getThemeMode, getLanguage } from "./components/functions";
import "./App.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Navbar from "./components/Navbar/Navbar";
import Books from "./components/Books/Books";
import Message from "./components/Message/Message";
import UserBooks from "./components/Books/UserBooks";
import BottomOfPage from "./components/BottomOfPage/BottomOfPage";
import SignIn from "./components/Authentication/Login";
import SignUp from "./components/Authentication/Register";

const App = () => {
  const [user, setUser] = useState(null);
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

  const [languageSelected, setLanguageSelected] = useState(getLanguage());
  const languageSelectedValue = useMemo(
    () => ({ languageSelected, setLanguageSelected }),
    [languageSelected, setLanguageSelected]
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
      setUser(meQuery.me.username);
    }
  }, [meQuery]);

  // Set new language to local storage
  useEffect(() => {
    localStorage.setItem("languageSelected", JSON.stringify(languageSelected));
  }, [languageSelected]);

  // Set new theme mode to local storage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <LanguageContext.Provider value={languageSelectedValue}>
          <CssBaseline />
          <header>
            {true && loading === false ? (
              <LanguageContext.Provider value={languageSelectedValue}>
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
              </LanguageContext.Provider>
            ) : null}
          </header>
          <main>
            {true && loading === false ? (
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
            ) : (
              <>
                {loading === false ? (
                  <Switch>
                    <Route
                      path="/register"
                      component={() => <SignUp user={user} />}
                    />
                    <Route path="/" component={() => <SignIn user={user} />} />
                  </Switch>
                ) : null}
              </>
            )}
          </main>
          <footer>
            <BottomOfPage />
          </footer>
        </LanguageContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
