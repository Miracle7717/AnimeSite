
const STORAGE_KEY = "anime_orders";

function readStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function writeStorage(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function listOrders() {
  return Promise.resolve(readStorage());
}

export function getOrder(id) {
  const orders = readStorage();
  const order = orders.find((o) => o.id === id);
  return Promise.resolve(order || null);
}

export function createOrder(data) {
  const orders = readStorage();
  const now = new Date().toISOString();
  const order = {
    id: generateId(),
    createdAt: now,
    ...data,
  };
  orders.unshift(order);
  writeStorage(orders);
  return Promise.resolve(order);
}

export function updateOrder(id, data) {
  const orders = readStorage();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return Promise.resolve(null);
  orders[idx] = { ...orders[idx], ...data };
  writeStorage(orders);
  return Promise.resolve(orders[idx]);
}

export function removeOrder(id) {
  let orders = readStorage();
  const before = orders.length;
  orders = orders.filter((o) => o.id !== id);
  writeStorage(orders);
  return Promise.resolve(before !== orders.length);
}

// Optional: seed with sample data if empty
if (!localStorage.getItem(STORAGE_KEY)) {
  const sample = [
    {
      id: generateId(),
      createdAt: new Date().toISOString(),
      title: "Naruto - Box Set",
      quantity: 1,
      price: 29.99,
      notes: "Gift",
    },
  ];
  writeStorage(sample);
}

export default { listOrders, getOrder, createOrder, updateOrder, removeOrder };
