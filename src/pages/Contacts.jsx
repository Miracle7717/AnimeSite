export default function Contacts() {
  return (
    <main className="page">
      <div className="container">
        <h1>Контакты</h1>
        <p>
          Свяжитесь с нами, если у вас есть вопросы, предложения или проблемы с сайтом.
        </p>
        <div className="contact-info">
          <h2>Связаться с нами:</h2>
          <p><strong>Email:</strong> <a href="mailto:rafiev_r@iuca.kg">rafiev_r@iuca.kg</a></p>
          <p><strong>Адрес:</strong> Кыргызстан, Бишкек</p>
        </div>
        <div className="social-links">
          <h2>Мы в социальных сетях:</h2>
          <p>
            <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a> |
            <a href="#" target="_blank" rel="noopener noreferrer">Discord</a> |
            <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
          </p>
        </div>
      </div>
    </main>
  );
}