import { useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favorites, Search, SearchResult } from "./components/Navbar";
import { allCharacters } from "../data/data";

function App() {
  const [characters, setCharacters] = useState(allCharacters);

  return (
    <>
      {/* //! Navigation Bar */}
      <Navbar>
        <Search />
        <SearchResult searchResultNumber={characters.length} />
        <Favorites />
      </Navbar>
      {/* //! Main Content Area */}
      <Main>
        <CharacterList characters={characters} />
        <CharacterDetail />
      </Main>
    </>
  );
}

export default App;

function Main({ children }) {
  return <main className="main">{children}</main>;
}
