// EditarPacienteModal.js
import React, { useState } from 'react';
import './editarPacienteModal.css';

const EditarPacienteModal = ({ paciente, onClose, onSave }) => {
    const [nome, setNome] = useState(paciente.nome);
    const [dataNascimento, setDataNascimento] = useState(paciente.data_nascimento);
    const [email, setEmail] = useState(paciente.email);
    const [telefone, setTelefone] = useState(paciente.telefone);

    const handleSave = () => {
        const updatedPaciente = {
            ...paciente,
            nome,
            data_nascimento: dataNascimento,
            email,
            telefone,
        };
        onSave(updatedPaciente);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar Paciente</h2>
                <label>
                    Nome:
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </label>
                <label>
                    Data de Nascimento:
                    <input
                        type="date"
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Telefone:
                    <input
                        type="tel"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                </label>
                <div className="modal-buttons">
                    <button onClick={handleSave}>Salvar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default EditarPacienteModal;
