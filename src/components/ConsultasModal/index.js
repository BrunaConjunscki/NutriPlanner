import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaQuestionCircle } from "react-icons/fa";
import axios from 'axios';
import 'react-quill/dist/quill.snow.css'; // Estilos para o editor de texto
import ReactQuill from 'react-quill';
import './consultasModal.css';
import Help from "../Help";
import NovaAntropometriaModal from "../NovaAntropometriaModal";
import VisualizarAntropometria from "../VisualizarAntropometria";

const ConsultasModal = ({ isOpen, onRequestClose, pacienteId }) => {
    const [consultas, setConsultas] = useState([]);
    const [data_consulta, setDataConsulta] = useState('');
    const [hora_consulta, setHoraConsulta] = useState('');
    const [anamnese, setAnamnese] = useState('nao');
    const [tipoAnamnese, setTipoAnamnese] = useState('');
    const [descricaoAnamnese, setDescricaoAnamnese] = useState('');
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showCadastro, setShowCadastro] = useState(false);
    const [anamneseToView, setAnamneseToView] = useState(null);
    const [newAntropometria, setNewAntropometria] = useState(null);
    const [consultaToNewAntropometria, setConsultaToNewAntropometria] = useState(null);
    const [showAntropometria, setShowAntropometria] = useState(false);

    useEffect(() => {
        if (pacienteId) {
            axios.get(`http://localhost:8000/api/pacientes/${pacienteId}/consultas`)
                .then(response => {
                    setConsultas(response.data);
                })
                .catch(error => console.error("Erro ao carregar consultas:", error));
        }
    }, [pacienteId]);

    const handleClose = () => {
        setShowConfirmation(true);
    };

    const handleConfirmClose = () => {
        setShowConfirmation(false);
        onRequestClose();
    };

    const handleCancelClose = () => {
        setShowConfirmation(false);
    };

    const handleViewAnamnese = (anamneseDescricao) => {
        setAnamneseToView(anamneseDescricao);
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Cria uma data 'ontem' com a hora zerada (meia-noite)
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);  // Subtrai 1 dia para obter a data de ontem
        const yesterdayFormatted = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
        
        // Cria a data da consulta e zera a hora
        const selectedDate = new Date(data_consulta);
        const selectedFormattedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        
        // Validar se os campos estão preenchidos
        if (!data_consulta) newErrors.data_consulta = 'Data da consulta é obrigatória';
        if (!hora_consulta) newErrors.hora_consulta = 'Hora da consulta é obrigatória';
        
        // Validar se a data da consulta não é anterior a ontem
        if (selectedFormattedDate < yesterdayFormatted) {
            newErrors.data_consulta = 'Data da consulta não pode ser anterior à data de ontem';
        }
    
        // Validar horário da consulta
        const selectedTime = hora_consulta.split(':');
        const selectedHour = parseInt(selectedTime[0], 10);
        if (selectedHour < 8 || selectedHour >= 18) newErrors.hora_consulta = 'O horário da consulta deve estar entre 08:00 e 18:00';
    
        // Validar anamnese
        if (anamnese === 'sim' && !tipoAnamnese) newErrors.tipoAnamnese = 'Tipo de anamnese é obrigatório';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true se não houver erros
    };
    

    const handleSaveConsulta = () => {
        if (!validateForm()) return; // Não salva se houver erros de validação

        const data = {
            paciente_id: pacienteId,
            data: data_consulta,
            horario: hora_consulta,
            anamnese: anamnese === 'sim' ? descricaoAnamnese : null, 
        };

        axios.post(`http://localhost:8000/api/pacientes/${pacienteId}/consultas`, data)
            .then(response => {
                setShowSuccess(true);
                setShowCadastro(false); // Fechar a tela de cadastro
                setTimeout(() => {
                    setShowSuccess(false);
                    onRequestClose(); // Fecha o modal após o sucesso
                }, 2000);
            })
            .catch(error => {
                console.error("Erro ao salvar consulta:", error);
                setErrors({ geral: 'Ocorreu um erro ao salvar a consulta. Tente novamente.' });
            });
    };

    function handleNewAntropometria (consultaId)  {
        setConsultaToNewAntropometria(consultaId);
        setNewAntropometria(true);
    }

    function handleShowAntropometria (consultaId) {
        setConsultaToNewAntropometria(consultaId);
        setShowAntropometria(true);
    }

    return (
        <>
            <Modal isOpen={isOpen} onRequestClose={handleClose} className="modal-content-consulta" overlayClassName="modal-overlay">
                <button className="modal-close-button-nenhuma-consulta" onClick={handleClose}>×</button>
                <FaQuestionCircle className='icon-consultas' onClick={() => setIsHelpOpen(true)} />
                <h2 className="modal-title">Consultas</h2>

                {!consultas.length && !showCadastro && (
                    <div className="no-consultas">
                        <p>Nenhuma consulta cadastrada</p>
                        <button onClick={() => setShowCadastro(true)} className="nova-consulta-button">Nova consulta</button>
                    </div>
                )}

                {consultas.length > 0 && !showCadastro && (
                    <div className="historico-consultas">
                        <h3>Histórico de Consultas</h3>
                        <ul>
                            {consultas.map((consulta, index) => (
                                <li key={index}>
                                    <span>Consulta {index + 1}</span>: {consulta.data}
                                    <button onClick={() => handleNewAntropometria(consulta.id)} className="nova-antropometria-button">Nova Antropometria</button>
                                    <button onClick={() => handleShowAntropometria(consulta.id)} className="nova-antropometria-button">Visualizar Antropometria</button>
                                    {/* {consulta.paciente.anamnese && consulta.paciente.anamnese.trim() !== '' ? (
                                        <button 
                                            className="visualizar-anamnese-button"
                                            onClick={() => handleViewAnamnese(consulta.paciente.anamnese)} // Passando a descrição da anamnese
                                        >
                                            Visualizar Anamnese
                                        </button>
                                    ) : (
                                        <p>Sem anamnese associada</p>  // Caso não tenha anamnese
                                    )} */}
                                    <button className="nova-antropometria-button">Nova Antropometria</button>
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => setShowCadastro(true)} className="nova-consulta-button-historico">Nova consulta</button>
                    </div>
                )}

                {showCadastro && (
                    <div className="modal-body-consulta">
                        <div className="form-grid">
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

                            {anamnese === 'sim' && (
                                <>
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
                                        </select>
                                        {errors.tipoAnamnese && <span className="error-message-modal">{errors.tipoAnamnese}</span>}
                                    </div>

                                    <div className="form-group-descricao-anamnese">
                                        <label>Descrição da Anamnese <span className="required">*</span></label>
                                        <ReactQuill 
                                            value={descricaoAnamnese} 
                                            onChange={setDescricaoAnamnese} 
                                            className="editor-consultas"
                                            placeholder="Escreva a descrição detalhada aqui..."
                                        />
                                    </div>
                                </>
                            )}
                            {errors.geral && <div className="error-message-general">{errors.geral}</div>}
                        </div>
                        <button onClick={handleSaveConsulta} className="modal-button">Cadastrar</button>
                    </div>
                )}

            {/* Modal salvo com sucesso */}
            {showSuccess && (
                <Modal isOpen={showSuccess} className="success-modal" overlayClassName="modal-overlay">
                    <div className="success-content">
                        <h3>Paciente atualizado com sucesso!</h3>
                    </div>
                </Modal>

            )}

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
            
            {isHelpOpen && (
                <Help
                    isOpen={isHelpOpen}
                    onRequestClose={() => setIsHelpOpen(false)}
                    location='consultas_modal'
                />
            )}

                {/* Modal para visualizar a anamnese */}
                {anamneseToView && (
                    <Modal
                        isOpen={!!anamneseToView}
                        onRequestClose={() => setAnamneseToView(null)}
                        className="modal-content-anamnese"
                        overlayClassName="modal-overlay"
                    >
                        <button className="modal-close-button" onClick={() => setAnamneseToView(null)}>×</button>
                        <h2>Visualizar Anamnese</h2>
                        <div dangerouslySetInnerHTML={ {__html: anamneseToView} }></div>
                    </Modal>
                )}

                {newAntropometria && (
                    <NovaAntropometriaModal
                        isOpen={newAntropometria}
                        onRequestClose={() => setNewAntropometria(false)}
                        pacienteId={pacienteId}
                        consultaId={consultaToNewAntropometria}
                    />
                )}

                {showAntropometria && (
                    <VisualizarAntropometria
                        isOpen={showAntropometria}
                        onRequestClose={() => setShowAntropometria(false)}
                        pacienteId={pacienteId}
                        consultaId={consultaToNewAntropometria}
                    />
                )}

            </Modal>

            <Help 
                isOpen={isHelpOpen} onRequestClose={() => setIsHelpOpen(false)}
                location='consultas_modal' 
            />
        </>
    );
};

export default ConsultasModal;
