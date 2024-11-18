import React, { useState, useEffect, useRef } from 'react';
import { FaQuestionCircle } from "react-icons/fa";
import Modal from 'react-modal';
import InputMask from 'react-input-mask';
import '../NovoPacienteModal/modal.css';
import axios from 'axios';
import Help from "../Help";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import '../RefeicaoModal/refeicao.css';
import {FaArrowAltCircleLeft} from "react-icons/fa";

const VisualizarAntropometriaModal = ({ isOpen, onRequestClose, pacienteId, consultaId=null }) => {
    const [antropometria, setAntropometria] = useState({});
    const [showDieta, setShowDieta] = useState(false);
    const [newDieta, setNewDieta] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [isHelpOpen, setIsHelpOpen] = useState(false)

    const validateForm = () => {
        return antropometria !== '';
    }



    const getConsulta = async () => {
        if (validateForm()) {
            try {
                const response = await axios.get(`http://localhost:8000/api/pacientes/${pacienteId}/consultas/${consultaId ?? 0}/antropometrias`, {
                }, { headers: { Accept: 'application/json' } });

                setAntropometria(response.data)
                console.log(response.data);
            } catch (error) {
                console.error("Error saving paciente:", error.message);
                // setError("Erro ao salvar paciente.");
            }
        }
    };



    useEffect(() => {
        getConsulta()
    }, []);

    return (
        <>
            <Modal isOpen={isOpen} onRequestClose={handleClose} className="modal-content-novo"
                   overlayClassName="modal-overlay-novoPaciente">
                <button className="modal-close-button-refeicao" onClick={handleClose}>×</button>
                <h2 className="modal-title">Antropometria</h2>
                <div className="modal-body" dangerouslySetInnerHTML={{__html: antropometria.antropometria ?? 'Paciente ainda não possui antropometria. Abra uma nova consulta para realizar a antropometria.'}}>



                </div>
            </Modal>

            {isHelpOpen && (
                <Help
                    isOpen={isHelpOpen}
                    onRequestClose={() => setIsHelpOpen(false)}
                    location='refeicao'
                />
            )}

            {showConfirmation && (
                <Modal isOpen={showConfirmation} className="confirmation-modal"
                       overlayClassName="modal-overlay-novoPaciente">
                    <div className="confirmation-content">
                        <h3>Tem certeza que deseja sair?</h3>
                        <div className="confirmation-buttons">
                            <button className="confirmar-button" onClick={handleConfirmClose}>Sim</button>
                            <button className="cancelar-button" onClick={handleCancelClose}>Não</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );

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

export default VisualizarAntropometriaModal;
