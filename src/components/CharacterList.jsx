import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";

function CharacterList({ characters, isLoading, onSelectCharacter, selectedId }) {
  return (
    <div className="characters">
      {isLoading ? (
        <Loader />
      ) : (
        characters.map((character) => (
          <Character key={character.id} character={character}>
            <button className="icon red" onClick={() => onSelectCharacter(character.id)}>
              {selectedId === character.id ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </Character>
        ))
      )}
    </div>
  );
}

export default CharacterList;

export function Character({ character, children }) {
  return (
    <div className="characters__item">
      <img src={character.image} alt={character.name} className="characters__item--img" />

      <CharacterName character={character} />
      <CharacterInfo character={character} />

      {children}
    </div>
  );
}

function CharacterName({ character }) {
  return (
    <h3 className="characters__item--name">
      <span>{character.gender === "Male" ? "🧔🏻‍♂️" : "👩🏻"}</span>
      <span>&nbsp;{character.name}</span>
    </h3>
  );
}

function CharacterInfo({ character }) {
  return (
    <div className="characters__item--info">
      <span className={`characters__status ${character.status === "Dead" ? "red" : ""}`}></span>
      <span>&nbsp;{character.status}&nbsp;</span>
      <span>&nbsp;- &nbsp;{character.species}</span>
    </div>
  );
}
