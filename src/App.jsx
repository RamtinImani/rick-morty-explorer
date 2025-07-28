import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favorites, Search, SearchResult } from "./components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  //! Fetch Characters
  useEffect(() => {
    async function fetchCharacters() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`
        );
        setCharacters(data.results.slice(0, 5));
      } catch (error) {
        setCharacters([]);
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCharacters();
  }, [query]);

  return (
    <>
      {/* //! Navigation Bar */}
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult searchResultNumber={characters.length} />
        <Favorites />
      </Navbar>
      {/* //! Main Content Area */}
      <Main>
        <CharacterList characters={characters} isLoading={isLoading} />
        <CharacterDetail />
      </Main>
      <Toaster />
    </>
  );
}

export default App;

function Main({ children }) {
  return <main className="main">{children}</main>;
}
