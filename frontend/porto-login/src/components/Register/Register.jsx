import React, { useState } from 'react';
import axios from 'axios';  // Para fazer requisições HTTP
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpar mensagens de erro ou sucesso
    setError('');
    setSuccessMessage('');

    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      // Enviar a requisição para o back-end
        await axios.post('http://localhost:4000/register', {
        username,
        password,
      });

      // Exibir mensagem de sucesso e limpar os campos
      setSuccessMessage('Usuário registrado com sucesso! Faça login.');
      setUsername('');
      setPassword('');
      setConfirmPassword('');

      // Opcional: Redirecionar o usuário para a página de login após o sucesso
      setTimeout(() => {
        navigate('/');  // Redireciona para a página de login
      }, 2000);  // Redireciona após 2 segundos (tempo para o usuário ler a mensagem)
    } catch (error) {
      setError('Erro ao registrar usuário');
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
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
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
