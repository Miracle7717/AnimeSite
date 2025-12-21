import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../AuthContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  function onSubmit(e) {
    e.preventDefault();
    const trimmed = query.trim();
   
    if (trimmed) navigate(`/?q=${encodeURIComponent(trimmed)}`);
    else if (location.pathname !== "/") navigate("/");
    setOpen(false);
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          RozZzaAni
        </Link>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((s) => !s)}
        >
          <span className="burger" />
        </button>

        <nav className={`nav ${open ? "open" : ""}`} aria-hidden={!open && undefined}>
          <Link to="/" onClick={() => setOpen(false)}>
            Главная
          </Link>
          <Link to="/my-anime" onClick={() => setOpen(false)}>
            Моя коллекция          </Link>
          <Link to="/about" onClick={() => setOpen(false)}>
            О нас
          </Link>
          <Link to="/contacts" onClick={() => setOpen(false)}>
            Контакты
          </Link>

          {user ? (
            <>
              <span>Привет, {user.name}!</span>
              <Link to="/" onClick={() => { logout(); setOpen(false); }}>Выйти</Link>
            </>
          ) : null}

          <form className="search" onSubmit={onSubmit} role="search">
            <input
              aria-label="Поиск аниме"
              placeholder="Поиск..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Поиск</button>
          </form>
        </nav>
      </div>
    </header>
  );
}