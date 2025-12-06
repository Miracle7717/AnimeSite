import AnimeCard from "../components/AnimeCard";
import { animeList } from "../data/anime";

export default function Home() {
  return (
    <div className="home">
      <h1 className="title">RozZzaAni</h1>
      <div className="grid">
        {animeList.map(anime => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
}