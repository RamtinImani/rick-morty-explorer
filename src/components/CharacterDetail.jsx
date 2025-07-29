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
    return <p className="character-detail__message">Please Select One Character</p>;
  }

  return (
    <div style={{ flex: 1 }}>
      <div className="character-detail">
        <img src={character.image} alt={character.name} className="character-detail__img" />

        <div className="character-detail__info">
          <h3 className="name">
            <span>{character.gender === "Male" ? "🧔🏻‍♂️" : "👩🏻"}</span>
            <span>&nbsp;{character.name}</span>
          </h3>

          <div className="info">
            <span className={`status ${character.status === "Dead" ? "red" : ""}`}></span>
            <span>&nbsp;{character.status} -</span>
            <span>&nbsp;{character.species}</span>
          </div>

          <div className="location">
            <p>Last Known Location:</p>
            <p>{character.location.name}</p>
          </div>

          <div className="actions">
            {isExistInFavorite ? (
              <p>Already Added To Favorites ❤️</p>
            ) : (
              <button onClick={() => onAddToFavorite(character)} className="btn btn--primary">
                Add To Favorite
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="character-episodes">
        <div className="title">
          <h2>List Of Episodes:</h2>
          <button>
            <ArrowUpCircleIcon className="icon" />
          </button>
        </div>

        <ul>
          {episodes.map((episode, index) => (
            <li key={episode.id}>
              <div>
                {String(index + 1).padStart(2, "0")} - {episode.episode} :{" "}
                <strong>{episode.name}</strong>
              </div>

              <div className="badge badge--secondary">{episode.air_date}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharacterDetail;
