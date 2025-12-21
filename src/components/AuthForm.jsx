import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Login logic
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        login(user);
        navigate('/');
      } else {
        setError('Неверный email или пароль');
      }
    } else {
      // Register logic
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Неверный формат email');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Пароли не совпадают');
        return;
      }
      if (formData.password.length < 6) {
        setError('Пароль должен быть не менее 6 символов');
        return;
      }
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.email === formData.email)) {
        setError('Email уже зарегистрирован');
        return;
      }
      register({
        name: formData.name,
        surname: formData.surname,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      });
      navigate('/');
    }
  };

  return (
    <div className="auth-page">
      <div className="welcome-section">
        <h1 className="welcome-title">Добро пожаловать в RozZzaAni</h1>
        <p className="welcome-subtitle">Ваш личный каталог аниме — находи, сохраняй и делись любимым контентом</p>
      </div>
      <div className="auth-container">
        <div className="auth-form max-w-md w-full">
          <h2 className="auth-title">{isLogin ? 'Вход' : 'Регистрация'}</h2>
        {error && <p className="auth-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="auth-label">Имя</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="auth-label">Фамилия</label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="auth-label">Телефон</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="auth-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="auth-input"
              required
            />
          </div>
          <div className="mb-4">
            <label className="auth-label">Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="auth-input"
              required
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label className="auth-label">Подтвердите пароль</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="auth-input"
                required
              />
            </div>
          )}
          <button type="submit" className="auth-button">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>
        <p className="text-center mt-4">
          {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="auth-switch ml-2"
          >
            {isLogin ? 'Регистрация' : 'Вход'}
          </button>
        </p>
      </div>
    </div>
  </div>
  );
};

export default AuthForm;