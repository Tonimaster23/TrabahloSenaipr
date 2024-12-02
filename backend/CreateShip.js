import React, { useState } from 'react';
import axios from 'axios';

const CreateShip = () => {
  const [formData, setFormData] = useState({
    nome_navio: '', // Nome do navio
    tipo: '',       // Tipo do navio
    imo_number: '', // Número IMO
    size: '',       // Tamanho do navio
    cargo_capacity: '', // Capacidade de carga
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:3000/ships', // Atualize para o endpoint correto
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Navio cadastrado com sucesso!');
      setFormData({
        nome_navio: '',
        tipo: '',
        imo_number: '',
        size: '',
        cargo_capacity: '',
      });
    } catch (error) {
      console.error('Erro ao cadastrar navio', error);
      alert('Erro ao cadastrar navio');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome do Navio:
        <input
          type="text"
          name="nome_navio"
          placeholder="Nome do Navio"
          value={formData.nome_navio}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Tipo do Navio:
        <input
          type="text"
          name="tipo"
          placeholder="Tipo do Navio"
          value={formData.tipo}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Número IMO:
        <input
          type="text"
          name="imo_number"
          placeholder="Número IMO"
          value={formData.imo_number}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Tamanho do Navio:
        <input
          type="text"
          name="size"
          placeholder="Tamanho do Navio"
          value={formData.size}
          onChange={handleChange}
        />
      </label>
      <label>
        Capacidade de Carga:
        <input
          type="text"
          name="cargo_capacity"
          placeholder="Capacidade de Carga"
          value={formData.cargo_capacity}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Cadastrar Navio</button>
    </form>
  );
};

export default CreateShip;
