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
    <div>
      <a href="#" className="navbar__logo">
        <img className="navbar__logo--img" src="/public/logo.png" alt="Rick & Morty Logo" />
        <span className="navbar__logo--text">Rick & Morty</span>
      </a>
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
  return (
    <div className="navbar__results">
      <span className="navbar__results--number">{searchResultNumber}</span>
      <span className="navbar__results--text">Characters Found</span>
    </div>
  );
}

export function Favorites({ favorites, onDeleteFavorite }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal title="Favorite Characters" onOpen={setIsOpen} open={isOpen}>
        {favorites.length === 0 ? (
          <p className="modal__message">No favorite characters have been added yet.</p>
        ) : (
          favorites.map((favCharacter) => (
            <Character key={favCharacter.id} character={favCharacter}>
              <button className="icon red" onClick={() => onDeleteFavorite(favCharacter.id)}>
                <TrashIcon />
              </button>
            </Character>
          ))
        )}
      </Modal>

      <button className="navbar__heart" onClick={() => setIsOpen((prevOpen) => !prevOpen)}>
        <HeartIcon className="icon" />
        <span className="badge">{favorites.length}</span>
      </button>
    </>
  );
}
