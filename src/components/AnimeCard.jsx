import { Link } from "react-router-dom";

export default function AnimeCard({ anime }) {
  return (
    <Link to={`/anime/${anime.id}`} className="anime-card">
      <img src={anime.poster} alt={anime.title} />
      
      <div className="card-body">
        <h3 className="no-underline">{anime.title}</h3>
        <p className="year">{anime.year}</p>
        <div className="rating no-underline">★ {anime.rating}</div>
      </div>
    </Link>
  );
}