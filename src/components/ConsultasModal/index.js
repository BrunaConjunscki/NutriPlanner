import React, { useState, useEffect, useRef } from 'react';
import { FaQuestionCircle } from "react-icons/fa";
import Modal from 'react-modal';
import './consultasModal.css';
import axios from 'axios';
import Help from "../Help";

const ConsultasModal = ({ isOpen, onRequestClose, pacienteId }) => {
    const [paciente, setPaciente] = useState({ id: '', nome: '' });
    const [data_consulta, setDataConsulta] = useState('');
    const [hora_consulta, setHoraConsulta] = useState('');
    const [anamnese, setAnamnese] = useState(null); // Estado para controlar a exibição do tipo de anamnese
    const [tipoAnamnese, setTipoAnamnese] = useState('');
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    const pacienteRef = useRef(null);

    // Carregar o paciente se o pacienteId for fornecido
    useEffect(() => {
        if (pacienteId) {
            axios.get(`http://localhost:8000/api/pacientes/${pacienteId}`)
                .then(response => {
                    setPaciente(response.data);
                })
                .catch(error => {
                    console.error("Error loading paciente:", error);
                });
        }
    }, [pacienteId]);

    useEffect(() => {
        if (isOpen && pacienteRef.current) {
            pacienteRef.current.focus();
            pacienteRef.current.select();
        }
    }, [isOpen]);

    const validateForm = () => {
        const newErrors = {};
        if (!data_consulta) newErrors.data_consulta = 'Data da consulta é obrigatória.';
        if (!hora_consulta) newErrors.hora_consulta = 'Hora da consulta é obrigatória.';
        if (anamnese === null) newErrors.anamnese = 'Por favor, selecione se há anamnese.';
        if (anamnese === 'sim' && !tipoAnamnese) newErrors.tipoAnamnese = 'Tipo de anamnese é obrigatório.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                await axios.post(`http://localhost:8000/api/pacientes/${pacienteId}/consultas`, {
                    paciente: pacienteId,  
                    data_consulta,
                    hora_consulta,
                    anamnese,
                    tipo_anamnese: tipoAnamnese,  
                });
                setShowSuccess(true);
            } catch (error) {
                console.error("Error saving consulta:", error);
            }
        }
    };

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
                onRequestClose();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess, onRequestClose]);

    return (
        <>
            <Modal isOpen={isOpen} 
                onRequestClose={onRequestClose}
                className="modal-content-consulta" 
                overlayClassName="modal-overlay"
            >
                <button className="modal-close-button" onClick={() => onRequestClose()}>×</button>
                <FaQuestionCircle className='icon' onClick={() => setIsHelpOpen(true)} />
                <h2 className="modal-title">Nova Consulta</h2>
                <div className="modal-body-consulta">
                    <div className="form-grid">
                        {/* Data da Consulta */}
                        <div className="form-group">
                            <label>Data da Consulta <span className="required">*</span></label>
                            <input
                                type="date"
                                value={data_consulta}
                                onChange={(e) => setDataConsulta(e.target.value)}
                                className={`input ${errors.data_consulta ? 'input-error' : ''}`}
                            />
                            {errors.data_consulta && <span className="error-message-modal">{errors.data_consulta}</span>}
                        </div>

                        {/* Hora da Consulta */}
                        <div className="form-group">
                            <label>Hora da Consulta <span className="required">*</span></label>
                            <input
                                type="time"
                                value={hora_consulta}
                                onChange={(e) => setHoraConsulta(e.target.value)}
                                className={`input ${errors.hora_consulta ? 'input-error' : ''}`}
                            />
                            {errors.hora_consulta && <span className="error-message-modal">{errors.hora_consulta}</span>}
                        </div>

                        {/* Anamnese */}
                        <div className="form-group">
                            <label>Possui Anamnese? <span className="required">*</span></label>
                            <div className="radio-group">
                                <input
                                    type="radio"
                                    id="sim"
                                    name="anamnese"
                                    value="sim"
                                    checked={anamnese === 'sim'}
                                    onChange={() => setAnamnese('sim')}
                                />
                                <label htmlFor="sim">Sim</label>
                                <input
                                    type="radio"
                                    id="nao"
                                    name="anamnese"
                                    value="nao"
                                    checked={anamnese === 'nao'}
                                    onChange={() => setAnamnese('nao')}
                                />
                                <label htmlFor="nao">Não</label>
                            </div>
                            {errors.anamnese && <span className="error-message-modal">{errors.anamnese}</span>}
                        </div>

                        {/* Tipo de Anamnese */}
                        {anamnese === 'sim' && (
                            <div className="form-group">
                                <label>Tipo de Anamnese <span className="required">*</span></label>
                                <select
                                    value={tipoAnamnese}
                                    onChange={(e) => setTipoAnamnese(e.target.value)}
                                    className={`input ${errors.tipoAnamnese ? 'input-error' : ''}`}
                                >
                                    <option value="">Selecione...</option>
                                    <option value="adulto">Adulto</option>
                                    <option value="idoso">Idoso</option>
                                    <option value="gestante">Gestante</option>
                                    <option value="criança">Criança</option>
                                </select>
                                {errors.tipoAnamnese && <span className="error-message-modal">{errors.tipoAnamnese}</span>}
                            </div>
                        )}
                    </div>

                    {/* Botões */}
                    <button onClick={handleSubmit} className="modal-button">Cadastrar</button>
                </div>
                {showSuccess && <div className="success-modal">Consulta cadastrada com sucesso!</div>}
            </Modal>

            <Help
                isOpen={isHelpOpen}
                onRequestClose={() => setIsHelpOpen(false)}
                content="Preencha os campos de acordo com as informações da consulta."
            />
        </>
    );
};

export default ConsultasModal;
