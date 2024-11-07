import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Ships = () => {
  const [ships, setShips] = useState([]);
  const [newShip, setNewShip] = useState({ name: '', type: '' });
  const [showForm, setShowForm] = useState(false);  // Controle para exibir o formulário de cadastro
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o usuário está autenticado
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redireciona para a página de login se não estiver logado
    } else {
      // Faz a requisição para obter a lista de navios
      axios
        .get('http://localhost:4000/ships', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setShips(response.data);
        })
        .catch((error) => {
          console.error('Erro ao obter navios', error);
        });
    }
  }, [navigate]);

  // Função para lidar com o envio do formulário de cadastro de navio
  const handleAddShip = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Usuário não autenticado');
      return;
    }

    try {
      // Enviar os dados do novo navio para o servidor
      await axios.post(
        'http://localhost:4000/ships',
        newShip,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Atualizar a lista de navios após o cadastro
      setShips((prevShips) => [...prevShips, newShip]);

      // Limpar o formulário e fechar o formulário de cadastro
      setNewShip({ name: '', type: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao cadastrar navio', error);
      setError('Erro ao cadastrar navio');
    }
  };

  return (
    <div>
      <h2>Lista de Navios</h2>
      <button onClick={() => navigate('/')}>Logout</button>

      {/* Exibe o formulário de cadastro de navio */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar Cadastro' : 'Cadastrar Navio'}
      </button>

      {showForm && (
        <form onSubmit={handleAddShip}>
          <div>
            <label>Nome do Navio</label>
            <input
              type="text"
              value={newShip.name}
              onChange={(e) => setNewShip({ ...newShip, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Tipo do Navio</label>
            <input
              type="text"
              value={newShip.type}
              onChange={(e) => setNewShip({ ...newShip, type: e.target.value })}
              required
            />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      )}

      {/* Exibe erro caso haja */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {ships.length > 0 ? (
          ships.map((ship) => (
            <li key={ship.id}>
              {ship.name} - {ship.type}
            </li>
          ))
        ) : (
          <p>Carregando navios...</p>
        )}
      </ul>
    </div>
  );
};

export default Ships;
