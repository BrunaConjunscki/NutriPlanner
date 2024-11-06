import React from 'react';

const AnamneseModal = ({ onClose }) => (
    <div className="modal">
        <button onClick={onClose}>Fechar</button>
        <h2>Modal de Anamnese</h2>
        {/* Conteúdo específico do modal de Anamnese */}
    </div>
);

export default AnamneseModal;
