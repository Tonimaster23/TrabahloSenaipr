import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Ships.css';

const Ships = () => {
  const [ships, setShips] = useState([]);
  const [newShip, setNewShip] = useState({ name: '', type: '' });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      axios
        .get('http://localhost:4000/ships', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setShips(response.data))
        .catch((error) => console.error('Erro ao obter navios', error));
    }
  }, [navigate]);

  const handleAddShip = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Usuário não autenticado');
      return;
    }
    try {
      await axios.post('http://localhost:4000/ships', newShip, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShips((prevShips) => [...prevShips, newShip]);
      setNewShip({ name: '', type: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao cadastrar navio', error);
      setError('Erro ao cadastrar navio');
    }
  };
<header className='ships-head'>
  <h1>MilkSpace</h1>

</header>
  return (
    <div className="ships-container">
      <h2>Lista de Navios</h2>
      <button className="logout-button" onClick={() => navigate('/')}>Logout</button>

      <button className="add-ship-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar Cadastro' : 'Cadastrar Navio'}
      </button>

      {showForm && (
        <form className="add-ship-form" onSubmit={handleAddShip}>
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
          <button type="submit" className="login-button">Cadastrar</button>
        </form>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul className="ships-list">
        {ships.length > 0 ? (
          ships.map((ship) => (
            <li key={ship.id} className="ship-card">
              <img src={`https://portosma.com.br/wp-content/uploads/2023/03/TRIPPLE-2.jpg`} alt={ship.name} />
              <p>{ship.name} - {ship.type}</p>
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