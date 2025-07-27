import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="main">
        <CharacterList characters={allCharacters} />
        <CharacterDetail />
      </main>
    </>
  );
}

export default App;
