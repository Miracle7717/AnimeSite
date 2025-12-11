import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../api/basketApi";

export default function CreateOrder() {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    const data = { title: title || `Заказ ${Date.now()}`, quantity: Number(quantity) || 1, price: Number(price) || 0, notes };
    api.createOrder(data).then((o) => navigate(`/basket/${o.id}`));
  }

  return (
    <main className="container">
      <h1>Создать заказ</h1>
      <form onSubmit={onSubmit} className="form" style={{ maxWidth: 480 }}>
        <div className="form-group">
          <label>Название</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Кол-во</label>
          <input className="input" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Цена (сом)</label>
          <input className="input" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Примечание</label>
          <input className="input" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>

        <div style={{ marginTop: 12 }}>
          <button type="submit" className="btn btn-primary">Создать</button>
          <button type="button" className="btn" style={{ marginLeft: 8 }} onClick={() => navigate('/basket')}>Отмена</button>
        </div>
      </form>
    </main>
  );
}
