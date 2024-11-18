import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import InputMask from 'react-input-mask';
import '../NovoPacienteModal/modal.css';
import './help.css';
import axios from 'axios';
import {queryHelpers} from "@testing-library/react";

const Help = ({ isOpen, onRequestClose, location }) => {
    const isMounted = useRef(false)
    if (!isMounted.current){
        if(location.substring(0, 10) === '/paciente/' )
            location = '/paciente'
    }

    useEffect(() => {
        isMounted.current = true
    },[])

    useEffect(() => {
        console.log(location)
    })

    const mapLocation = {
        '/home': {
            'nome': 'Página Inicial',
            'ajuda':
                <div className="modal-content-help">
                    <p>
                        Na página inicial, são mostrados os seus cinco últimos pacientes e templates de anamneses cadastrados, assim opções de casdastro rápido.
                    </p>
                </div>
        },
        '/paciente': {
            'nome': 'Detalhes do paciente',
            'ajuda':
                <div className="modal-content-help">
                    <p>Nessa tela, você verá os detalhes do paciente, como dados pessoais, anamnese e a última antropometria realizada, além de ter a opção de realizar uma nova consulta.</p>
                </div>
        },
        '/pacientes': {
            'nome': 'Pacientes',
            'ajuda':
                <div className="modal-content-help">
                    <p>Nessa tela, você verá todos os seus pacientes. Ao clicar em um paciente, você será redirecionado à tela do paciente</p>
                </div>
        },
        'novo_paciente': {
            'nome': 'Novo Paciente',
            'ajuda':
                <div className="modal-content-help">
                    <p>
                        Nessa tela, você poderá cadastrar um novo paciente, preenchendo os seguintes campos:
                    </p>
                    <br/>
                    <ul>
                        <li>Nome completo: nome completo do paciente - PREENCHIMENTO OBRIGATÓRIO</li>
                        <li>Data de nascimento: data de nascimento do paciente - PREENCHIMENTO OBRIGATÓRIO. NOTA: se
                            preenchido com data menor de 18 anos, será necessário informar nome do responsável pelo
                            paciente
                        </li>
                        <li>Nome do responsável: nome do responsável pelo paciente, visível apenas se paciente for menor
                            de idade - PREENCHIMENTO OBRIGATÓRIO
                        </li>
                        <li>Tipo do paciente: categoria nutricional que paciente se encaixa - PREENCHIMENTO
                            OBRIGATÓRIO
                        </li>
                        <li>Gênero Biológico: gênero de nascença do paciente - PREENCHIMENTO OBRIGATÓRIO</li>
                        <li>Email: email do paciente, utilizado para manter informações de contato</li>
                        <li>Telefone com DDD: telefone do paciente, utilizado para manter informações de contato</li>
                        <li>Objetivos: principais objetivos do paciente com o acompanhamento nutricional</li>
                    </ul>
                </div>
        },
        '/anamneses': {
            'nome': 'Anamneses',
            'ajuda':
                <div className="modal-content-help">
                    <p>Nessa tela, você verá todos os seus modelos de anamnese. Ao clicar em novo modelo, você poderá editar o modelo da anamnese.</p>
                </div>
        },
        'anamnese_modal': {
            'nome': 'Anamnese',
            'ajuda':
                <div className="modal-content-help">
                    <p>Nessa tela, você poderá visualizar a anamnese do paciente.</p>
                </div>
        },
        'consultas_modal': {
            'nome': 'Consultas',
            'ajuda':
                <div className="modal-content-help">
                    <p>Nessa tela, você verá todas as consultas do paciente selecionado, além de poder visualizar a antropometria realizada na consulta ou cadastrar uma nova. </p>
                </div>
        },
        '/refeicoes': {
            'nome': 'Refeições',
            'ajuda':
                <div className="modal-content-help">
                    <p>Nessa tela você verá seus modelos de refeições.</p>
                </div>
        }
    }

    return (
        <>
        <Modal isOpen={isOpen} onRequestClose={handleClose} className="modal-content-help" overlayClassName="modal-overlay">
            <button className="modal-close-button" onClick={handleClose}>×</button>
            <h2 className="modal-title">Ajuda - {mapLocation[location]?.nome}</h2>
            <div className="modal-body">
                {mapLocation[location]?.ajuda}
            </div>
        </Modal>
        </>
    );

    function handleClose() {
        onRequestClose();
    }

};

export default Help;
