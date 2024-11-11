import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './anamneseModal.css';

const AnamneseModal = ({ isOpen, onClose, patientId }) => {
  const [anamneseData, setAnamneseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && patientId) {
      fetchAnamneseData(patientId);
    }
  }, [isOpen, patientId]);

  const fetchAnamneseData = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/anamnese/${id}`);
      setAnamneseData(response.data);
    } catch (err) {
      setError('Erro ao buscar a anamnese do paciente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Anamnese do Paciente</h2>
        {loading && <p>Carregando anamnese...</p>}
        {error && <p className="error-message">{error}</p>}
        {anamneseData && !loading && !error ? (
          <div>
            {/* Exemplo de campo da anamnese */}
            <p>Descrição: {anamneseData.description}</p>
            {/* Adicione outros campos conforme necessário */}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AnamneseModal;
