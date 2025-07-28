import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";

function CharacterList({ characters, isLoading, onSelectCharacter, selectedId }) {
  return (
    <div className="characters-list">
      {isLoading ? (
        <Loader />
      ) : (
        characters.map((character) => (
          <Character
            key={character.id}
            character={character}
            onSelectCharacter={onSelectCharacter}
            selectedId={selectedId}
          />
        ))
      )}
    </div>
  );
}

export default CharacterList;

function Character({ character, onSelectCharacter, selectedId }) {
  return (
    <div className="list__item">
      <img src={character.image} alt={character.name} />

      <CharacterName character={character} />
      <CharacterInfo character={character} />

      <button className="icon red" onClick={() => onSelectCharacter(character.id)}>
        {selectedId === character.id ? <EyeSlashIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}

function CharacterName({ character }) {
  return (
    <h3 className="name">
      <span>{character.gender === "Male" ? "🧔🏻‍♂️" : "👩🏻"}</span>
      <span>&nbsp;{character.name}</span>
    </h3>
  );
}

function CharacterInfo({ character }) {
  return (
    <div className="list-item__info info">
      <span className={`status ${character.status === "Dead" ? "red" : ""}`}></span>
      <span>&nbsp;{character.status}&nbsp;</span>
      <span>&nbsp;- &nbsp;{character.species}</span>
    </div>
  );
}
