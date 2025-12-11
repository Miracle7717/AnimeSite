import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as api from "../api/basketApi";

export default function UpdateOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.getOrder(id).then((o) => {
      setOrder(o);
      if (o) {
        setTitle(o.title || "");
        setQuantity(o.quantity || 1);
        setPrice(o.price || 0);
        setNotes(o.notes || "");
      }
    });
  }, [id]);

  function onSubmit(e) {
    e.preventDefault();
    const data = { title, quantity: Number(quantity), price: Number(price), notes };
    api.updateOrder(id, data).then(() => navigate(`/basket/${id}`));
  }

  if (!order) return <main className="container"><p>Загрузка...</p></main>;

  return (
    <main className="container">
      <h1>Редактировать заказ</h1>
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
          <button type="submit" className="btn btn-primary">Сохранить</button>
          <button type="button" className="btn" style={{ marginLeft: 8 }} onClick={() => navigate(`/basket/${id}`)}>Отмена</button>
        </div>
      </form>
    </main>
  );
}
