export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container footer-grid">
        <div className="footer-col">
          <h4>RozZzaAni</h4>
          <p className="muted">Твой личный каталог аниме — находи, сохраняй и делись любимым контентом.</p>
        </div>

        <div className="footer-col">
          <h5>Ссылки</h5>
          <nav className="footer-links">
            <a href="/">Главная</a>
            <a href="/my-anime">Моя коллекция</a>
            <a href="/about">О нас</a>
            <a href="/contacts">Контакты</a>
          </nav>
        </div>

        <div className="footer-col">
          <h5>Контакты</h5>
          <p className="muted">Email: <a href="mailto:info@RozZzaAni.local">rafiev_r@iuca.kg</a></p>
          <div className="social">
            <a href="#" aria-label="Twitter"></a>
            <a href="#" aria-label="Discord"></a>
            <a href="#" aria-label="GitHub"></a>
          </div>
        </div>.

        <div className="footer-bottom">
          <p>© 2025 RozZzaAni — Наслаждайся просмотром аниме</p>
        </div>
      </div>
    </footer> 
  );
}