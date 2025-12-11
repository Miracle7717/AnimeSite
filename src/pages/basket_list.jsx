import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../api/basketApi";
import ConfirmModal from "../components/ConfirmModal";

export default function BasketList() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.listOrders().then(setOrders);
  }, []);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  function requestDelete(id) {
    setToDeleteId(id);
    setConfirmOpen(true);
  }

  function onConfirmDelete() {
    if (!toDeleteId) return;
    api.removeOrder(toDeleteId).then((ok) => {
      if (ok) setOrders((s) => s.filter((o) => o.id !== toDeleteId));
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
      <h1>Корзина / Заказы</h1>
      <div className="orders-header">
        <button className="btn btn-primary" onClick={() => navigate("/basket/create")}>+ Создать заказ</button>
      </div>

      {orders.length === 0 ? (
        <p className="empty-state">Заказов нет. Начните с создания первого!</p>
      ) : (
        <div className="orders-list">
          {orders.map((o) => (
            <div key={o.id} className="order-card">
              <div className="order-info">
                <Link to={`/basket/${o.id}`} className="order-title">{o.title || `Заказ ${o.id}`}</Link>
                <div className="order-details">
                  <span className="detail-item">📦 Кол-во: <strong>{o.quantity}</strong></span>
                  <span className="detail-item">💰 Цена: <strong>{o.price} сом</strong></span>
                  <span className="detail-item">📅 {new Date(o.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="order-actions">
                <button className="btn btn-sm" onClick={() => navigate(`/basket/${o.id}/edit`)}>Ред.</button>
                <button className="btn btn-sm btn-danger" onClick={() => requestDelete(o.id)}>Уд.</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
      <ConfirmModal
        open={confirmOpen}
        title={"Удалить заказ"}
        message={"Вы уверены, что хотите удалить этот заказ?"}
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
      />
    </>
  );
}
