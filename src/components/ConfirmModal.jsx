import React from "react";

export default function ConfirmModal({ open, title = "Подтвердите действие", message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="btn btn-danger" onClick={onConfirm}>Удалить</button>
          <button className="btn" onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </div>
  );
}
