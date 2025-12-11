import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

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
          <Link to="/basket" onClick={() => setOpen(false)}>
            Корзина          </Link>
          <span className="coming-soon">Топ-100</span>

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