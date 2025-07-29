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

export function Favorites({ favorites }) {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge">{favorites.length}</span>
    </button>
  );
}
