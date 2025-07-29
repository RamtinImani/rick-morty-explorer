import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { Character } from "./CharacterList";

function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Logo />
      {children}
    </nav>
  );
}

export default Navbar;

function Logo() {
  return (
    <div className="navbar__logo">
      <a href="#">🎭 Rick & Morty</a>
    </div>
  );
}

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="search"
      className="text-field"
      name="search"
      placeholder="Search"
    />
  );
}

export function SearchResult({ searchResultNumber }) {
  return <div className="navbar__results">Found {searchResultNumber} Characters</div>;
}

export function Favorites({ favorites, onDeleteFavorite }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal title="Favorite Characters" onOpen={setIsOpen} open={isOpen}>
        {favorites.map((favCharacter) => (
          <Character key={favCharacter.id} character={favCharacter}>
            <button className="icon red" onClick={() => onDeleteFavorite(favCharacter.id)}>
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>

      <button className="heart" onClick={() => setIsOpen((prevOpen) => !prevOpen)}>
        <HeartIcon className="icon" />
        <span className="badge">{favorites.length}</span>
      </button>
    </>
  );
}
