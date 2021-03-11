import React from "react";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/SearchBar/SearchBar";
import Books from "./components/Books/Books";

const App = () => {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <SearchBar />
        <Books />
      </main>
    </div>
  );
};

export default App;
