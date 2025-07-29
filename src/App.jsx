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
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useState([]);

  //! Fetch Characters
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchCharacters() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`,
          { signal }
        );
        setCharacters(data.results.slice(0, 5));
      } catch (error) {
        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchCharacters();

    //! clean up data fetching
    return () => {
      controller.abort();
    };
  }, [query]);

  //! Select Character Handler
  const handleSelectCharacter = (characterId) => {
    setSelectedId((prevId) => (prevId === characterId ? null : characterId));
  };

  //! Add Character To Favorites Handler
  const handleAddToFavorite = (character) => {
    setFavorites((prevFav) => [...prevFav, character]);
  };

  //! Prevent duplicate addition of favorite character to favorites cart
  const isExistInFavorite = favorites.map((favCharacter) => favCharacter.id).includes(selectedId);

  return (
    <>
      {/* //! Navigation Bar */}
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult searchResultNumber={characters.length} />
        <Favorites favorites={favorites} />
      </Navbar>
      {/* //! Main Content Area */}
      <Main>
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectCharacter}
          selectedId={selectedId}
        />
        <CharacterDetail
          selectedId={selectedId}
          onAddToFavorite={handleAddToFavorite}
          isExistInFavorite={isExistInFavorite}
        />
      </Main>
      <Toaster />
    </>
  );
}

export default App;

function Main({ children }) {
  return <main className="main">{children}</main>;
}
