import React, { useState, useEffect, useMemo } from "react";
import { Route, Switch } from "react-router-dom";
import { MessageContext } from "./components/Contexts/MessageContext";
import { MessageContentContext } from "./components/Contexts/MessageContentContext";
import { getThemeMode } from "./components/functions";
import "./App.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Navbar from "./components/Navbar/Navbar";
import Books from "./components/Books/Books";
import Message from "./components/Message/Message";
import UserBooks from "./components/Books/UserBooks";
import BottomOfPage from "./components/BottomOfPage/BottomOfPage";

const App = () => {
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

  const [darkMode, setDarkMode] = useState(getThemeMode());

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  // Set theme mode on change to local storage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <header>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        </header>
        <main>
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
        </main>
        <footer>
          <BottomOfPage />
        </footer>
      </ThemeProvider>
    </div>
  );
};

export default App;
