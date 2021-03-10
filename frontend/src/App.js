import "./App.css";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Books from "./components/Books";

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
