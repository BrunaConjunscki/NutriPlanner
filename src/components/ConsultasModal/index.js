import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaQuestionCircle } from "react-icons/fa";
import axios from 'axios';
import 'react-quill/dist/quill.snow.css'; // Estilos para o editor de texto
import ReactQuill from 'react-quill';
import './consultasModal.css';
import Help from "../Help";

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

    const handleSaveConsulta = () => {
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
                                    <button className="nova-antropometria-button">Nova Antropometria</button>
                                    
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
                                            <option value="gestante">Gestante</option>
                                            <option value="criança">Criança</option>
                                        </select>
                                        {errors.tipoAnamnese && <span className="error-message-modal">{errors.tipoAnamnese}</span>}
                                    </div>
                                    <div className="form-group-descricao-anamnese">
    <label>Descrição da Anamnese</label>
    <ReactQuill
        value={descricaoAnamnese}
        onChange={setDescricaoAnamnese}
        className="editor-consultas"
        placeholder="Escreva a descrição detalhada aqui..."
    />
</div>

                                </>
                            )}
                        </div>
                        
                        <button onClick={handleSaveConsulta} className="modal-button">Cadastrar</button>
                    </div>
                )}

            {showSuccess && (
                <Modal isOpen={showSuccess} className="success-modal" overlayClassName="modal-overlay-novoPaciente">
                    <div className="success-content">
                        <h3>Paciente cadastrado com sucesso!</h3>
                    </div>
                </Modal>

            )}

            {showConfirmation && (
                <Modal isOpen={showConfirmation} className="confirmation-modal" overlayClassName="modal-overlay-novoPaciente">
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
            </Modal>
        </>
    );
};

export default ConsultasModal;
