import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as api from "../api/myAnimeApi";
import ConfirmModal from "../components/ConfirmModal";

export default function MyAnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.getMyAnime(id).then((a) => setAnime(a));
  }, [id]);

  const [confirmOpen, setConfirmOpen] = useState(false);

  function getStatusText(status) {
    switch (status) {
      case 'plan_to_watch': return 'Планирую посмотреть';
      case 'watching': return 'Смотрю';
      case 'completed': return 'Просмотрено';
      case 'dropped': return 'Брошено';
      default: return 'Неизвестно';
    }
  }

  function requestDelete() {
    setConfirmOpen(true);
  }

  function onConfirmDelete() {
    api.removeAnime(id).then(() => navigate("/my-anime"));
  }

  function onCancelDelete() {
    setConfirmOpen(false);
  }

  if (!anime) return <main className="container"><p>Загрузка...</p></main>;

  return (
    <>
    <main className="container">
      <h1>{anime.title || `Аниме ${anime.id}`}</h1>
      <p><strong>ID:</strong> {anime.id}</p>
      <p><strong>Добавлено:</strong> {new Date(anime.addedAt).toLocaleString()}</p>
      <p><strong>Статус:</strong> {getStatusText(anime.status)}</p>
      {anime.rating && <p><strong>Рейтинг:</strong> {anime.rating}/10</p>}
      {anime.notes && <p><strong>Примечания:</strong> {anime.notes}</p>}

      <div style={{ marginTop: 12 }}>
        <Link to={`/my-anime/${id}/edit`}><button className="btn btn-primary">Редактировать</button></Link>
        <button className="btn btn-danger" style={{ marginLeft: 8 }} onClick={requestDelete}>Удалить</button>
        <button className="btn" style={{ marginLeft: 8 }} onClick={() => navigate('/my-anime')}>Назад</button>
      </div>
    </main>
    <ConfirmModal
      open={confirmOpen}
      title={"Удалить аниме"}
      message={"Вы уверены, что хотите удалить это аниме из коллекции?"}
      onConfirm={onConfirmDelete}
      onCancel={onCancelDelete}
    />
    </>
  );
}
