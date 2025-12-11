import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as api from "../api/basketApi";
import ConfirmModal from "../components/ConfirmModal";

export default function BasketDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.getOrder(id).then((o) => setOrder(o));
  }, [id]);

  const [confirmOpen, setConfirmOpen] = useState(false);

  function requestDelete() {
    setConfirmOpen(true);
  }

  function onConfirmDelete() {
    api.removeOrder(id).then(() => navigate("/basket"));
  }

  function onCancelDelete() {
    setConfirmOpen(false);
  }

  if (!order) return <main className="container"><p>Загрузка...</p></main>;

  return (
    <>
    <main className="container">
      <h1>{order.title || `Заказ ${order.id}`}</h1>
      <p><strong>ID:</strong> {order.id}</p>
      <p><strong>Создан:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      <p><strong>Кол-во:</strong> {order.quantity}</p>
      <p><strong>Цена:</strong> {order.price} сом</p>
      <p><strong>Примечание:</strong> {order.notes}</p>

      <div style={{ marginTop: 12 }}>
        <Link to={`/basket/${id}/edit`}><button className="btn btn-primary">Редактировать</button></Link>
        <button className="btn btn-danger" style={{ marginLeft: 8 }} onClick={requestDelete}>Удалить</button>
        <button className="btn" style={{ marginLeft: 8 }} onClick={() => navigate('/basket')}>Назад</button>
      </div>
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
