import { HeartIcon } from "@heroicons/react/24/outline";

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

export function Search() {
  return <input type="search" className="text-field" name="search" placeholder="Search" />;
}

export function SearchResult({ searchResultNumber }) {
  return <div className="navbar__results">Found {searchResultNumber} Characters</div>;
}

export function Favorites() {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge">0</span>
    </button>
  );
}
