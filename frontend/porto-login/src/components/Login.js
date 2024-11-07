import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';  // Importando o Link

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Para redirecionar após login

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpar o erro anterior
    setError('');

    try {
      // Enviar a requisição para a API de login
      const response = await axios.post('http://localhost:4000/login', { username, password });

      // Salvar o token JWT no localStorage
      localStorage.setItem('token', response.data.token);

      // Redirecionar para a página de navios (ou qualquer outra página protegida)
      navigate('/ships');
    } catch (error) {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {/* Link para a página de Registro */}
      <p>Não tem uma conta? <Link to="/register">Cadastre-se aqui</Link></p>
    </div>
  );
};

export default Login;
