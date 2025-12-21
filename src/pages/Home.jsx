import AnimeCard from "../components/AnimeCard";
import AuthForm from "../components/AuthForm";
import { animeList } from "../data/anime";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Home() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { user } = useAuth();

  if (!user) {
    return <AuthForm />;
  }

  const filteredAnime = query
    ? animeList.filter(anime =>
        anime.title.toLowerCase().includes(query.toLowerCase()) ||
        anime.original.toLowerCase().includes(query.toLowerCase()) ||
        anime.description.toLowerCase().includes(query.toLowerCase()) ||
        anime.genres.some(genre => genre.toLowerCase().includes(query.toLowerCase()))
      )
    : animeList;

  return (
    <div className="home">
      <h1 className="title">RozZzaAni</h1>
      {query && (
        <p className="search-results">
          Результаты поиска по "{query}": найдено {filteredAnime.length} аниме
        </p>
      )}
      <div className="grid">
        {filteredAnime.map(anime => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
}