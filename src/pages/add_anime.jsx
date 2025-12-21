import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../api/myAnimeApi";

export default function AddAnime() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("plan_to_watch");
  const [rating, setRating] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    const data = { 
      title: title || `Аниме ${Date.now()}`, 
      status, 
      rating: rating ? Number(rating) : null, 
      notes 
    };
    api.addAnime(data).then((a) => navigate(`/my-anime/${a.id}`));
  }

  return (
    <main className="container">
      <h1>Добавить аниме</h1>
      <form onSubmit={onSubmit} className="form" style={{ maxWidth: 480 }}>
        <div className="form-group">
          <label>Название</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Статус</label>
          <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="plan_to_watch">Планирую посмотреть</option>
            <option value="watching">Смотрю</option>
            <option value="completed">Просмотрено</option>
            <option value="dropped">Брошено</option>
          </select>
        </div>

        <div className="form-group">
          <label>Рейтинг (1-10)</label>
          <input className="input" type="number" min="1" max="10" value={rating} onChange={(e) => setRating(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Примечания</label>
          <textarea className="input" value={notes} onChange={(e) => setNotes(e.target.value)} rows="3" />
        </div>

        <div style={{ marginTop: 12 }}>
          <button type="submit" className="btn btn-primary">Добавить</button>
          <button type="button" className="btn" style={{ marginLeft: 8 }} onClick={() => navigate('/my-anime')}>Отмена</button>
        </div>
      </form>
    </main>
  );
}
