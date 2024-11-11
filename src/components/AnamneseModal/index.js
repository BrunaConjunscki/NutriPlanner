import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaQuestionCircle } from "react-icons/fa";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import Help from "../Help";
import './anamneseModal.css';

const AnamneseModal = ({ isOpen, onRequestClose, anamneseDescricao, pacienteId }) => {

    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    

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


    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={handleClose} 
            className="modal-content-anamnese" 
            overlayClassName="modal-overlay"
        >
            <button className="close-button-anamnese" onClick={handleClose}>×</button>
            <FaQuestionCircle className='icon-anamnese' onClick={() => setIsHelpOpen(true)} />
            <h2 className="modal-title-anamnese">Visualização da Anamnese</h2>
            <div className="anamnese-descricao">
                {anamneseDescricao ? (
                    <p dangerouslySetInnerHTML={ {__html: anamneseDescricao} }></p>
                ) : (
                    <p>Não há anamnese disponível para esta consulta.</p>
                )}
            </div>
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
            
                <Help
                    isOpen={isHelpOpen}
                    onRequestClose={() => setIsHelpOpen(false)}
                    location='anamnese_modal'
                />
            

                {/* Modal para visualizar a anamnese */}
                {/* {anamneseToView && (
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
                )} */}
        </Modal>
    );
};

export default AnamneseModal;
