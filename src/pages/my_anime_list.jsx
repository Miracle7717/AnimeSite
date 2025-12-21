import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../api/myAnimeApi";
import ConfirmModal from "../components/ConfirmModal";

export default function MyAnimeList() {
  const [anime, setAnime] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.listMyAnime().then(setAnime);
  }, []);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  function getStatusText(status) {
    switch (status) {
      case 'plan_to_watch': return 'Планирую посмотреть';
      case 'watching': return 'Смотрю';
      case 'completed': return 'Просмотрено';
      case 'dropped': return 'Брошено';
      default: return 'Неизвестно';
    }
  }

  function requestDelete(id) {
    setToDeleteId(id);
    setConfirmOpen(true);
  }

  function onConfirmDelete() {
    if (!toDeleteId) return;
    api.removeAnime(toDeleteId).then((ok) => {
      if (ok) setAnime((s) => s.filter((a) => a.id !== toDeleteId));
      setConfirmOpen(false);
      setToDeleteId(null);
    });
  }

  function onCancelDelete() {
    setConfirmOpen(false);
    setToDeleteId(null);
  }

  return (
    <>
    <main className="container">
      <h1>Моя коллекция аниме</h1>
      <div className="orders-header">
        <button className="btn btn-primary" onClick={() => navigate("/my-anime/add")}>+ Добавить аниме</button>
      </div>

      {anime.length === 0 ? (
        <p className="empty-state">У вас нет аниме в коллекции. Добавьте первое!</p>
      ) : (
        <div className="orders-list">
          {anime.map((a) => (
            <div key={a.id} className="order-card">
              <div className="order-info">
                <Link to={`/my-anime/${a.id}`} className="order-title">{a.title || `Аниме ${a.id}`}</Link>
                <div className="order-details">
                  <span className="detail-item">📺 Статус: <strong>{getStatusText(a.status)}</strong></span>
                  {a.rating && <span className="detail-item">⭐ Рейтинг: <strong>{a.rating}/10</strong></span>}
                  <span className="detail-item">📅 Добавлено: {new Date(a.addedAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="order-actions">
                <button className="btn btn-sm" onClick={() => navigate(`/my-anime/${a.id}/edit`)}>Ред.</button>
                <button className="btn btn-sm btn-danger" onClick={() => requestDelete(a.id)}>Уд.</button>
              </div>
            </div>
          ))}
        </div>
      )}
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
