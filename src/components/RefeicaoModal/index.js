import React, { useState, useEffect, useRef } from 'react';
import { FaQuestionCircle } from "react-icons/fa";
import Modal from 'react-modal';
import InputMask from 'react-input-mask';
import '../NovoPacienteModal/modal.css';
import axios from 'axios';
import Help from "../Help";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import './refeicao.css';
import {FaArrowAltCircleLeft} from "react-icons/fa";

const NovoPacienteModal = ({ isOpen, onRequestClose, paciente }) => {
    const [dieta, setDieta] = useState('');
    const [showDieta, setShowDieta] = useState(false);
    const [newDieta, setNewDieta] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [isHelpOpen, setIsHelpOpen] = useState(false)

    const validateForm = () => {
        return dieta !== '';
    }



    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const response = await axios.post(`http://localhost:8000/api/pacientes/${paciente.id}/dietas`, {
                    dieta
                }, { headers: { Accept: 'application/json' } });


                console.log(response.data);
                setShowSuccess(true);
            } catch (error) {
                console.error("Error saving paciente:", error);
                // setError("Erro ao salvar paciente.");
            }
        }
    };

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
                onRequestClose(); // fecha o modal
                window.location.reload()
            }, 1000); // 2000 ms = 2 segundos

            return () => clearTimeout(timer); // Limpa o timer se o modal for fechado antes
        }
    }, [showSuccess, onRequestClose]);

    return (
        <>
            <Modal isOpen={isOpen} onRequestClose={handleClose} className="modal-content-novo"
                   overlayClassName="modal-overlay-novoPaciente">
                <button className="modal-close-button-refeicao" onClick={handleClose}>×</button>
                <h2 className="modal-title">Refeição</h2>
                <div className="modal-body">
                    {!showDieta && !newDieta && (
                        <div className={'buttons'}>
                            <button className={'modal-button-refeicao'} onClick={handleShowDieta}>Ver dieta</button>
                            <button className={'modal-button-refeicao'} onClick={handleShowNewDieta}>Nova dieta</button>
                        </div>
                    )}

                    {!showDieta && newDieta && (
                        <div>
                            <button className={'modal-button-voltar'} onClick={handleLimpar}>
                                <FaArrowAltCircleLeft className={'icon-voltar'}/>
                                Voltar
                            </button>

                            <div className={'form-group-refeicao'}>

                                <ReactQuill
                                    value={dieta}
                                    onChange={setDieta}
                                    placeholder="Digite a refeição aqui..."
                                    className={'editor-refeicao'}
                                />
                            </div>

                            <div className="buttons-salvar">
                                <button className={'modal-button-refeicao'} onClick={handleSubmit}>
                                    Salvar Refeição
                                </button>
                            </div>
                        </div>
                    )}

                    {showDieta && !newDieta && (
                        <div>
                            <button className={'modal-button-voltar'} onClick={handleLimpar}>
                                <FaArrowAltCircleLeft className={'icon-voltar'}/>
                                Voltar
                            </button>
                            <div dangerouslySetInnerHTML={{__html: paciente.dieta}}></div>
                        </div>
                    )}

                    {showSuccess && (
                        <Modal isOpen={showSuccess} className="success-modal" overlayClassName="modal-overlay-novoPaciente">
                            <div className="success-content">
                                <h3>Dieta Atualizada com Sucesso!</h3>
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



                </div>
            </Modal>

            {isHelpOpen && (
                <Help
                    isOpen={isHelpOpen}
                    onRequestClose={() => setIsHelpOpen(false)}
                    location='refeicao'
                />
            )}
        </>
    );

    function handleShowNewDieta() {
        setNewDieta(true)
    }

    function handleShowDieta() {
        setShowDieta(true)
    }

    function handleLimpar() {
        setShowDieta(false)
        setNewDieta(false)
    }

    function handleClose() {
        setShowConfirmation(true);
    }

    function handleConfirmClose() {
        setShowConfirmation(false);
        onRequestClose();
    }

    function handleCancelClose() {
        setShowConfirmation(false);
    }

    function handleSuccessClose() {
        setShowSuccess(false);
        onRequestClose();
    }
};

export default NovoPacienteModal;
