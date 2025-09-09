import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "./Loader";

function CharacterDetail({ selectedId, onAddToFavorite, isExistInFavorite }) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  //! Fetch Single Character
  useEffect(() => {
    async function fetchSingleCharacter() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${selectedId}`);
        setCharacter(data);

        //! Fetch Episodes
        const episodesId = data.episode.map((episode) => episode.split("/").at(-1));
        const { data: episodesData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setEpisodes([episodesData].flat().slice(0, 5));
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    //! Condition for first execution
    if (selectedId) fetchSingleCharacter();
  }, [selectedId]);

  if (isLoading) {
    return (
      <div style={{ flex: 1 }}>
        <Loader />
      </div>
    );
  }

  if (!character || !selectedId) {
    return <p className="character__detail--message">Please Select One Character</p>;
  }

  return (
    <div style={{ flex: 1 }}>
      <CharacterSubInfo
        character={character}
        onAddToFavorite={onAddToFavorite}
        isExistInFavorite={isExistInFavorite}
      />

      <CharacterEpisodes episodes={episodes} />
    </div>
  );
}

export default CharacterDetail;

function CharacterSubInfo({ character, onAddToFavorite, isExistInFavorite }) {
  return (
    <div className="character__detail">
      <img src={character.image} alt={character.name} className="character__detail--img" />

      <div className="character__detail--data">
        <h3 className="character__detail--name">
          <span>{character.gender === "Male" ? "🧔🏻‍♂️" : "👩🏻"}</span>
          <span>&nbsp;{character.name}</span>
        </h3>

        <div className="character__detail--info">
          <span className={`characters__status ${character.status === "Dead" ? "red" : ""}`}></span>
          <span>&nbsp;{character.status} -</span>
          <span>&nbsp;{character.species}</span>
        </div>

        <div className="character__detail--location">
          <p>Last Known Location:</p>
          <p>{character.location.name}</p>
        </div>

        <div className="character__detail--actions">
          {isExistInFavorite ? (
            <p className="character__detail--actions-text">Added to favorites ❤️</p>
          ) : (
            <button onClick={() => onAddToFavorite(character)} className="btn btn--primary">
              Add To Favorite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CharacterEpisodes({ episodes }) {
  const [sortBy, setSortBy] = useState(true); //! true ==> ascending , false ==> descending

  let sortedEpisodes;
  if (sortBy) {
    sortedEpisodes = [...episodes].sort((a, b) => {
      return new Date(a.created) - new Date(b.created);
    });
  } else {
    sortedEpisodes = [...episodes].sort((a, b) => {
      return new Date(b.created) - new Date(a.created);
    });
  }

  return (
    <div className="character__episodes">
      <div className="character__episodes--header">
        <h2 className="character__episodes--title">List Of Episodes:</h2>
        <button
          className={`${sortBy ? "rotate-up" : "rotate-down"}`}
          onClick={() => setSortBy((prevSortBy) => !prevSortBy)}
        >
          <ArrowUpCircleIcon className="icon" />
        </button>
      </div>

      <ul>
        {sortedEpisodes.map((episode, index) => (
          <li key={episode.id} className="character__episodes--item">
            <div>
              {String(index + 1).padStart(2, "0")} - {episode.episode} :{" "}
              <strong>{episode.name}</strong>
            </div>

            <div className="badge badge--secondary">{episode.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
