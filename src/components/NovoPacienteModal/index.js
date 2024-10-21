import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import InputMask from 'react-input-mask';
import './modal.css';
import axios from 'axios';

const NovoPacienteModal = ({ isOpen, onRequestClose }) => {
    const [nome, setNome] = useState('');
    const [data_nascimento, setdata_nascimento] = useState('');
    const [nome_responsavel, setnome_responsavel] = useState('');
    const [tipo_paciente, settipo_paciente] = useState('');
    const [sexo, setsexo] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [objetivo, setobjetivo] = useState('');
    const [isMenorIdade, setIsMenorIdade] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const nomeRef = useRef(null);

    useEffect(() => {
        if (isOpen && nomeRef.current) {
            nomeRef.current.focus();
            nomeRef.current.select();
        }
    }, [isOpen]);

    useEffect(() => {
        const calcularIdade = (data) => {
            const hoje = new Date();
            const nascimento = new Date(data.split("/").reverse().join("-"));
            let idade = hoje.getFullYear() - nascimento.getFullYear();
            const mes = hoje.getMonth() - nascimento.getMonth();
            if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
                idade--;
            }
            return idade;
        };

        if (data_nascimento) {
            const idade = calcularIdade(data_nascimento);
            setIsMenorIdade(idade < 18);
        }
    }, [data_nascimento]);

    const validateForm = () => {
        const newErrors = {};
        const regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/;
    
        if (!nome) newErrors.nome = 'Nome completo é obrigatório.';
        if (isMenorIdade && !nome_responsavel) newErrors.nome_responsavel = 'Nome do responsável é obrigatório.';
        if (!tipo_paciente) newErrors.tipo_paciente = 'Tipo de paciente é obrigatório.';
        if (!sexo) newErrors.sexo = 'Gênero biológico é obrigatório.';
        if (!telefone || !regexTelefone.test(telefone)) newErrors.telefone = 'Telefone com DDD no formato (XX) XXXXX-XXXX é obrigatório.';
        if (!objetivo) newErrors.objetivo = 'Os objetivos são obrigatórios.';
    
        // Validação de data de nascimento
        const hoje = new Date();
        const nascimento = new Date(data_nascimento.split("/").reverse().join("-"));
        if (!data_nascimento) {
            newErrors.data_nascimento = 'Data de nascimento é obrigatória.';
        } else if (nascimento > hoje) {
            newErrors.data_nascimento = 'Data de nascimento não pode ser no futuro.';
        } else if (nascimento > new Date(hoje.setFullYear(hoje.getFullYear() - 0))) {
            newErrors.data_nascimento = 'A data de nascimento parece ser muito recente.';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    


const handleSubmit = async () => {
    if (validateForm()) {
        try {
            const response = await axios.post('http://localhost:8000/api/pacientes', {
                nome,
                data_nascimento,
                nome_responsavel,
                tipo_paciente,
                sexo,
                email,
                telefone,
                objetivo,
            });

            
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
            }, 3000); // 3000 ms = 3 segundos

            return () => clearTimeout(timer); // Limpa o timer se o modal for fechado antes
        }
    }, [showSuccess, onRequestClose]);

    return (
        <>
            <Modal isOpen={isOpen} onRequestClose={handleClose} className="modal-content" overlayClassName="modal-overlay">
                <button className="modal-close-button" onClick={handleClose}>×</button>
                <h2 className="modal-title">Novo Paciente</h2>
                <div className="modal-body">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Nome Completo <span className="required">*</span></label>
                            <input
                                type="text"
                                ref={nomeRef}
                                placeholder="Nome Completo"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className={`input ${errors.nome ? 'input-error' : ''}`}
                            />
                            {errors.nome && <span className="error-message">{errors.nome}</span>}
                        </div>
                        <div className="form-group">
                            <label>Data de Nascimento <span className="required">*</span></label>
                            <input 
                                type="date"
                                onChange={(e) => setdata_nascimento(e.target.value)}
                                value={data_nascimento}
                                className={`input ${errors.data_nascimento ? 'input-error' : ''}`}
                            />
                            {errors.data_nascimento && <span className="error-message">{errors.data_nascimento}</span>}
                        </div>


                        {isMenorIdade && (
                            <div className="form-group">
                                <label>Nome do Responsável <span className="required">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Nome do Responsável"
                                    value={nome_responsavel}
                                    onChange={(e) => setnome_responsavel(e.target.value)}
                                    className={`input ${errors.nome_responsavel ? 'input-error' : ''}`}
                                />
                                {errors.nome_responsavel && <span className="error-message">{errors.nome_responsavel}</span>}
                            </div>
                        )}
                        <div className="form-group">
                            <label>Tipo de Paciente <span className="required">*</span></label>
                            <select
                                value={tipo_paciente}
                                onChange={(e) => settipo_paciente(e.target.value)}
                                className={`input ${errors.tipo_paciente ? 'input-error' : ''}`}
                            >
                                <option value="">Selecione</option>
                                <option value="adulto">Adulto</option>
                                <option value="idoso">Idoso</option>
                                <option value="criança">Criança</option>
                                <option value="gestante">Gestante</option>
                            </select>
                            {errors.tipo_paciente && <span className="error-message">{errors.tipo_paciente}</span>}
                        </div>
                        <div className="form-group">
                            <label>Gênero Biológico <span className="required">*</span></label>
                            <select
                                value={sexo}
                                onChange={(e) => setsexo(e.target.value)}
                                className={`input ${errors.sexo ? 'input-error' : ''}`}
                            >
                                <option value="">Selecione</option>
                                <option value="F">Feminino</option>
                                <option value="M">Masculino</option>
                            </select>
                            {errors.sexo && <span className="error-message">{errors.sexo}</span>}
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input"
                            />
                        </div>
                        <div className="form-group">
                            <label>Telefone com DDD <span className="required">*</span></label>
                            <InputMask
                                mask="(99) 99999-9999"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                                maskChar={null}
                            >
                                {(inputProps) => (
                                    <input
                                        {...inputProps}
                                        type="text"
                                        placeholder="(XX) XXXXX-XXXX"
                                        className={`input ${errors.telefone ? 'input-error' : ''}`}
                                    />
                                )}
                            </InputMask>
                            {errors.telefone && <span className="error-message">{errors.telefone}</span>}
                        </div>
                        <div className="form-group full-width">
                            <label>Objetivos <span className="required">*</span></label>
                            <input
                                type="text"
                                placeholder="Objetivos"
                                value={objetivo}
                                onChange={(e) => setobjetivo(e.target.value)}
                                className={`input ${errors.objetivo ? 'input-error' : ''}`}
                            />
                            {errors.objetivo && <span className="error-message">{errors.objetivo}</span>}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="modal-button" onClick={handleSubmit}>Cadastrar</button>
                    </div>
                </div>
            </Modal>

            {showSuccess && (
                <Modal isOpen={showSuccess} className="success-modal" overlayClassName="modal-overlay">
                <div className="success-content">
                    <h3>Paciente cadastrado com sucesso!</h3>
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

export default NovoPacienteModal;
