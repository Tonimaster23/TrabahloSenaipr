import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import './Login.css' 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/ships');
    } catch (error) {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <>
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>Usuário</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="remember-container">
          <label>
            <input type="checkbox" /> Lembrar-se
          </label>
          <Link to="/register" className="register-link">Cadastre-se</Link>
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
    </>
  );
};

export default Login;

