import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Ships/Header';
import Footer from '../Ships/Footer';
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

  return (
    <>
      <Header />
      <div className="ships-container">
        <h2 className="ships-title">Lista de Navios</h2>
        <button className="logout-button" onClick={() => navigate('/')}>
          Logout
        </button>

        <button
          className="add-ship-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar Cadastro' : 'Cadastrar Navio'}
        </button>

        {showForm && (
          <form className="add-ship-form" onSubmit={handleAddShip}>
            <div>
              <label>Nome do Navio</label>
              <input
                type="text"
                value={newShip.name}
                onChange={(e) =>
                  setNewShip({ ...newShip, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label>Tipo do Navio</label>
              <input
                type="text"
                value={newShip.type}
                onChange={(e) =>
                  setNewShip({ ...newShip, type: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="login-button">
              Cadastrar
            </button>
          </form>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <ul className="ships-grid">
  {ships.length > 0 ? (
    ships.map((ship) => (
      <div key={ship.id} className="ship-card">
        <button className="delete-button">🗑</button>
        <img
          src="https://portosma.com.br/wp-content/uploads/2023/03/TRIPPLE-2.jpg"
          alt={ship.name}
          className="ship-image"
        />
        <p className="ship-status">{ship.status || "Ativo/Indo"}</p>
        <p className="ship-date">{ship.date || "12/11/2024 12:00"}</p>
        <button
                  className="action-button"
                  onClick={() => navigate('/viagem')}
                >
                  Nova viagem
                  </button>
        <button
  className="action-button"
  onClick={() => navigate('/edit-ship', { state: ship })}
>
  Editar navio
</button>

      </div>
    ))
  ) : (
    <p>Carregando navios...</p>
  )}
</ul>

        <button className="add-ship-button">Cadastrar nova embarcação</button>
      </div>
      <Footer />
    </>
  );
};

export default Ships;
