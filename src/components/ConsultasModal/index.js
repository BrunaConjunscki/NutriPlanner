import React, { useState, useEffect } from 'react';
import { FaQuestionCircle } from "react-icons/fa";
import Modal from 'react-modal';
import axios from 'axios';
import './consultasModal.css';
import Help from "../Help";

const ConsultasModal = ({ isOpen, onRequestClose, pacienteId }) => {
    const [consultas, setConsultas] = useState([]);
    const [data_consulta, setDataConsulta] = useState('');
    const [hora_consulta, setHoraConsulta] = useState('');
    const [anamnese, setAnamnese] = useState(null); 
    const [tipoAnamnese, setTipoAnamnese] = useState('');
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [showCadastro, setShowCadastro] = useState(false); // Controla a exibição do formulário de cadastro

    // Buscar consultas do paciente
    useEffect(() => {
        if (pacienteId) {
            axios.get(`http://localhost:8000/api/pacientes/${pacienteId}/consultas`)
                .then(response => {
                    setConsultas(response.data); // Define o histórico de consultas
                })
                .catch(error => {
                    console.error("Erro ao carregar consultas:", error);
                });
        }
    }, [pacienteId]);

    // Função para validar o formulário
    const validateForm = () => {
        const newErrors = {};
        if (!data_consulta) newErrors.data_consulta = 'Data da consulta é obrigatória.';
        if (!hora_consulta) newErrors.hora_consulta = 'Hora da consulta é obrigatória.';
        if (anamnese === null) newErrors.anamnese = 'Por favor, selecione se há anamnese.';
        if (anamnese === 'sim' && !tipoAnamnese) newErrors.tipoAnamnese = 'Tipo de anamnese é obrigatório.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Função para enviar o formulário
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
                setShowCadastro(false); // Fechar o cadastro após sucesso
            } catch (error) {
                console.error("Erro ao salvar consulta:", error);
            }
        }
    };

    // Fechar o modal após a consulta ser cadastrada com sucesso
    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
                onRequestClose();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess, onRequestClose]);

    const handleClose = () => {
        setShowConfirmation(true); // Exibe o modal de confirmação ao tentar fechar
    };

    const handleConfirmClose = () => {
        setShowConfirmation(false);
        onRequestClose();
    };

    const handleCancelClose = () => {
        setShowConfirmation(false);
    };

    return (
        <>
        <Modal isOpen={isOpen} 
               onRequestClose={handleClose}
               className="modal-content-consulta" 
               overlayClassName="modal-overlay"
        >
            <button className="modal-close-button" onClick={handleClose}>×</button>
            <FaQuestionCircle className='icon-consultas' onClick={() => setIsHelpOpen(true)} />
            <h2 className="modal-title">Consultas</h2>

            {/* Tela inicial - Sem consultas cadastradas */}
            {!consultas.length && !showCadastro && (
                <div className="no-consultas">
                    <p>Nenhuma consulta cadastrada</p>
                    <button onClick={() => setShowCadastro(true)} className="nova-consulta-button">Nova consulta</button>
                </div>
            )}

            {/* Tela de Histórico de Consultas */}
            {consultas.length > 0 && !showCadastro && (
                <div className="historico-consultas">
                    <h3>Histórico de Consultas</h3>
                    <ul>
                        {consultas.map((consulta, index) => (
                            <li key={index}>
                                {consulta.data_consulta} - {consulta.hora_consulta} - {consulta.anamnese ? 'Com Anamnese' : 'Sem Anamnese'}
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => setShowCadastro(true)} className="nova-consulta-button">Nova consulta</button>
                </div>
            )}

            {/* Tela de Cadastro de Consulta */}
            {showCadastro && (
                <div className="modal-body-consulta">
                    <div className="form-grid">
                        {/* Data da Consulta */}
                        <div className="form-group">
                            <label>Data da Consulta <span className="required">*</span></label>
                            <input
                                type="date"
                                value={data_consulta}
                                onChange={(e) => setDataConsulta(e.target.value)}
                                className={`input-consultas ${errors.data_consulta ? 'input-error' : ''}`}
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
                                className={`input-consultas ${errors.hora_consulta ? 'input-error' : ''}`}
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
                                    className={`input-consultas ${errors.tipoAnamnese ? 'input-error' : ''}`}
                                >
                                    <option value="">Selecione...</option>
                                    <option value="branco">Em branco</option>
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
            )}

            {showSuccess && <div className="success-modal">Consulta cadastrada com sucesso!</div>}

            <Help
                isOpen={isHelpOpen}
                onRequestClose={() => setIsHelpOpen(false)}
                content="Preencha os campos de acordo com as informações da consulta."
            />
        </Modal>

        {/* Modal de confirmação de fechamento */}
        {showConfirmation && (
                <Modal isOpen={showConfirmation} className="confirmation-modal" overlayClassName="modal-overlay">
                    <div className="confirmation-content">
                        <h3>Deseja sair sem salvar?</h3>
                        <div className="confirmation-buttons">
                            <button className="confirmar-button" onClick={handleConfirmClose}>Sim</button>
                            <button className="cancelar-button" onClick={handleCancelClose}>Não</button>
                        </div>
                    </div>
                </Modal>

            )}
        </>
    );   
};

export default ConsultasModal;
