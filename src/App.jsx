import { useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favorites, Search, SearchResult } from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const { isLoading, characters } = useCharacters(
    "https://rickandmortyapi.com/api/character/?name",
    query
  );
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useLocalStorage("Favorites", []);

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

  //! Delete Favorite Character Handler
  const handleDeleteFavorite = (characterId) => {
    setFavorites((prevFav) => prevFav.filter((favCharacter) => favCharacter.id !== characterId));
  };

  return (
    <>
      {/* //! Navigation Bar */}
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult searchResultNumber={characters.length} />
        <Favorites favorites={favorites} onDeleteFavorite={handleDeleteFavorite} />
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
