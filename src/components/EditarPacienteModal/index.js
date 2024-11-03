import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import InputMask from 'react-input-mask';
import './editarPacienteModal.css';
import axios from 'axios';

const EditarPacienteModal = ({ isOpen, onRequestClose, paciente, onSave }) => {
    const [nome, setNome] = useState('');
    const [data_nascimento, setDataNascimento] = useState('');
    const [nome_responsavel, setNomeResponsavel] = useState('');
    const [tipo_paciente, setTipoPaciente] = useState('');
    const [sexo, setSexo] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [objetivo, setObjetivo] = useState('');
    const [isMenorIdade, setIsMenorIdade] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const nomeRef = useRef(null);

    useEffect(() => {
        if (isOpen && nomeRef.current) {
            nomeRef.current.focus();
            nomeRef.current.select();
        }
    }, [isOpen]);

    useEffect(() => {
        if (paciente) {
            setNome(paciente.nome);
            setDataNascimento(paciente.data_nascimento);
            setNomeResponsavel(paciente.nome_responsavel || '');
            setTipoPaciente(paciente.tipo_paciente);
            setSexo(paciente.sexo);
            setEmail(paciente.email || '');
            setTelefone(paciente.telefone);
            setObjetivo(paciente.objetivo);
        }
    }, [paciente]);

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
                const response = await axios.put(`http://localhost:8000/api/pacientes/${paciente.id}`, {
                    nome,
                    data_nascimento,
                    nome_responsavel,
                    tipo_paciente,
                    sexo,
                    email,
                    telefone,
                    objetivo,
                }, { headers: { Accept: 'application/json' } });
    
                console.log(response.data);
                setShowSuccess(true);
                setErrorMessage(''); 
                
                // Chama a função onSave após salvar o paciente
                onSave(response.data); // Passa os dados do paciente atualizado
            } catch (error) {
                console.error("Error updating paciente:", error);
                setErrorMessage("Erro ao atualizar paciente."); // Atualiza mensagem de erro
            }
        }
    };
    

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
                onRequestClose(); // Fecha o modal
            }, 2000); // 2000 ms = 2 segundos

            return () => clearTimeout(timer); // Limpa o timer se o modal for fechado antes
        }
    }, [showSuccess, onRequestClose]);

    return (
        <>
            <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal-content-novo" overlayClassName="modal-overlay">
                <button className="modal-close-button" onClick={onRequestClose}>×</button>
                <h2 className="modal-title">Editar Paciente</h2>
                <div className="modal-body">
                    <div className="form-grid">

                        {/* NOME COMPLETO */}
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
                            {errors.nome && <span className="error-message-modal">{errors.nome}</span>}
                        </div>

                        {/* DATA NASCIMENTO */}
                        <div className="form-group">
                            <label>Data de Nascimento <span className="required">*</span></label>
                            <input
                                type="date"
                                onChange={(e) => {
                                    const selectedDate = e.target.value;
                                    setDataNascimento(selectedDate);
                                    const hoje = new Date();
                                    const nascimento = new Date(selectedDate);

                                    // Validação instantânea: verifica se a data é no futuro
                                    if (nascimento > hoje) {
                                        setErrors(prevErrors => ({
                                            ...prevErrors,
                                            data_nascimento: 'Data de nascimento não pode ser no futuro.'
                                        }));
                                    } else {
                                        // Remove o erro se a data for válida
                                        setErrors(prevErrors => {
                                            const { data_nascimento, ...rest } = prevErrors;
                                            return rest;
                                        });
                                    }
                                }}
                                value={data_nascimento}
                                max={new Date().toISOString().split("T")[0]} // Limita a data ao dia de hoje
                                className={`input ${errors.data_nascimento ? 'input-error' : ''}`}
                            />
                            {errors.data_nascimento && <span className="error-message-modal">{errors.data_nascimento}</span>}
                        </div>

                        {/* NOME RESPONSAVEL */}
                        {isMenorIdade && (
                            <div className="form-group">
                                <label>Nome do Responsável <span className="required">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Nome do Responsável"
                                    value={nome_responsavel}
                                    onChange={(e) => setNomeResponsavel(e.target.value)}
                                    className={`input ${errors.nome_responsavel ? 'input-error' : ''}`}
                                />
                                {errors.nome_responsavel && <span className="error-message-modal">{errors.nome_responsavel}</span>}
                            </div>
                        )}

                        {/* TIPO PACIENTE */}
                        <div className="form-group">
                            <label>Tipo de Paciente <span className="required">*</span></label>
                            <select
                                value={tipo_paciente}
                                onChange={(e) => setTipoPaciente(e.target.value)}
                                className={`input ${errors.tipo_paciente ? 'input-error' : ''}`}
                            >
                                <option value="">Selecione um tipo</option>
                                <option value="adulto">Adulto</option>
                                <option value="idoso">Idoso</option>
                                <option value="criança">Criança</option>
                                <option value="gestante">Gestante</option>
                            </select>
                            {errors.tipo_paciente && <span className="error-message-modal">{errors.tipo_paciente}</span>}
                        </div>

                        {/* SEXO */}
                        <div className="form-group">
                            <label>Gênero Biológico <span className="required">*</span></label>
                            <select
                                value={sexo}
                                onChange={(e) => setSexo(e.target.value)}
                                className={`input ${errors.sexo ? 'input-error' : ''}`}
                            >
                                <option value="">Selecione um gênero</option>
                                <option value="feminino">Feminino</option>
                                <option value="masculino">Masculino</option>
                            </select>
                            {errors.sexo && <span className="error-message-modal">{errors.sexo}</span>}
                        </div>

                        {/* EMAIL */}
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

                        {/* TELEFONE */}
                        <div className="form-group">
                            <label>Telefone com DDD <span className="required">*</span></label>
                            <InputMask
                                mask="(99) 99999-9999"
                                placeholder="(XX) XXXXX-XXXX"
                                value={telefone}
                                onChange={(e) => {
                                    const newTelefone = e.target.value;
                                    console.log("Telefone atual:", newTelefone); // Log para verificar o valor do telefone
                                    setTelefone(newTelefone);

                                    // Verificação em tempo real
                                    const regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/;
                                    if (!regexTelefone.test(newTelefone)) {
                                        setErrors(prevErrors => ({
                                            ...prevErrors,
                                            telefone: 'Telefone com DDD no formato (XX) XXXXX-XXXX é obrigatório.'
                                        }));
                                    } else {
                                        // Remove o erro se o telefone for válido
                                        setErrors(prevErrors => {
                                            const { telefone, ...rest } = prevErrors;
                                            return rest;
                                        });
                                    }
                                }}
                                className={`input ${errors.telefone ? 'input-error' : ''}`}
                            />
                            {errors.telefone && <span className="error-message-modal">{errors.telefone}</span>}
                        </div>


                        {/* OBJETIVOS */}
                        <div className="form-group">
                            <label>Objetivos <span className="required">*</span></label>
                            <textarea
                                value={objetivo}
                                onChange={(e) => setObjetivo(e.target.value)}
                                className={`input ${errors.objetivo ? 'input-error' : ''}`}
                                placeholder="Descreva os objetivos"
                            />
                            {errors.objetivo && <span className="error-message-modal">{errors.objetivo}</span>}
                        </div>

                        {errorMessage && <span className="error-message-modal">{errorMessage}</span>} {/* Mensagem de erro geral */}

                        <button className="button" onClick={handleSubmit}>Salvar</button>
                        {showSuccess && <span className="success-message-modal">Paciente atualizado com sucesso!</span>}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default EditarPacienteModal;