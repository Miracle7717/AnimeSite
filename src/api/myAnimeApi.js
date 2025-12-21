
const STORAGE_KEY = "my_anime_list";

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

export function listMyAnime() {
  return Promise.resolve(readStorage());
}

export function getMyAnime(id) {
  const anime = readStorage();
  const item = anime.find((a) => a.id === id);
  return Promise.resolve(item || null);
}

export function addAnime(data) {
  const anime = readStorage();
  const now = new Date().toISOString();
  const item = {
    id: generateId(),
    addedAt: now,
    status: 'plan_to_watch', // plan_to_watch, watching, completed, dropped
    rating: null,
    notes: '',
    ...data,
  };
  anime.unshift(item);
  writeStorage(anime);
  return Promise.resolve(item);
}

export function updateAnime(id, data) {
  const anime = readStorage();
  const idx = anime.findIndex((a) => a.id === id);
  if (idx === -1) return Promise.resolve(null);
  anime[idx] = { ...anime[idx], ...data };
  writeStorage(anime);
  return Promise.resolve(anime[idx]);
}

export function removeAnime(id) {
  let anime = readStorage();
  const before = anime.length;
  anime = anime.filter((a) => a.id !== id);
  writeStorage(anime);
  return Promise.resolve(before !== anime.length);
}


