import { useParams, Link } from "react-router-dom";
import { animeList } from "../data/anime";
import { useAuth } from "../AuthContext";
import * as api from "../api/myAnimeApi";

export default function AnimeDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const anime = animeList.find(a => a.id === Number(id));

  if (!anime) return <div className="notfound">Аниме не найдено</div>;

  function addToCollection() {
    if (!user) return;
    api.addAnime({ title: anime.title }).then(() => {
      alert('Аниме добавлено в коллекцию!');
    });
  }

  return (
    <div className="detail-page">
      <Link to="/" className="back">← Назад</Link>
      <div className="detail">
        <img src={anime.poster} alt="" className="poster" />
        <div className="info">
          <h1>{anime.title}</h1>
          <p className="original">{anime.original} • {anime.year}</p>
          <p className="rating-big">★ {anime.rating}</p>
          <p><strong>Режиссёр:</strong> {anime.director}</p>
          <div className="genres">
            {anime.genres.map(g => <span key={g}>{g}</span>)}
          </div>
          <p className="desc">{anime.description}</p>
          {user && (
            <button className="btn btn-primary" onClick={addToCollection} style={{ marginTop: '1rem' }}>
              Добавить в коллекцию
            </button>
          )}
        </div>
      </div>
    </div>
  );
}