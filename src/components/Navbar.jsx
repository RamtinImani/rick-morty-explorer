import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <a href="#">🎭 Rick & Morty</a>
      </div>

      <input type="search" className="text-field" name="search" placeholder="Search" />

      <div className="navbar__results">Found X Characters</div>

      <button className="heart">
        <HeartIcon className="icon" />
        <span className="badge">0</span>
      </button>
    </nav>
  );
}

export default Navbar;
