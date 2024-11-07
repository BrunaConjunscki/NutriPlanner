import React, { useEffect, useState } from 'react';
import { FaFilePdf, FaPlusCircle } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import './anamneseModal.css';  // Importar o CSS similar ao do ConsultasModal

const AnamneseModal = ({ onClose, pacienteId }) => {
    const [anamnese, setAnamnese] = useState(null); // Guarda a anamnese selecionada
    const [anamneseText, setAnamneseText] = useState(""); // Texto do editor
    const [anamneses, setAnamneses] = useState([]); // Lista de anamneses registradas
    const [loading, setLoading] = useState(true); // Controle de carregamento
    const [newAnamnese, setNewAnamnese] = useState(false); // Controle para mostrar o editor de nova anamnese

    // Carrega as anamneses do servidor com base no pacienteId
    useEffect(() => {
        const fetchAnamneses = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/anamneses/${pacienteId}`);
                setAnamneses(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar as anamneses:", error);
                setLoading(false);
            }
        };
        fetchAnamneses();
    }, [pacienteId]);

    // Função para gerar o PDF da anamnese
    const handleSaveAnamnese = () => {
        const doc = new jsPDF();
        doc.text(anamneseText, 10, 10); // Texto da anamnese
        doc.save(`anamnese_${pacienteId}.pdf`);
    };

    // Função para salvar uma nova anamnese
    const handleCreateAnamnese = () => {
        if (!anamneseText.trim()) {
            alert("Preencha o campo da anamnese antes de salvar!");
            return;
        }
        // Aqui você poderia fazer uma requisição para salvar no banco
        // Simulando o salvamento no estado:
        setAnamneses([...anamneses, { texto: anamneseText, id: Date.now() }]);
        setNewAnamnese(false);
        setAnamneseText(""); // Limpa o campo de texto após salvar
    };

    return (
        <div className="anamnese-modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>

                {loading ? (
                    <p>Carregando...</p>
                ) : anamneses.length === 0 ? (
                    <div>
                        <p>Nenhuma anamnese registrada</p>
                        <button className="button-nova-anamnese" onClick={() => setNewAnamnese(true)}>
                            <FaPlusCircle /> Nova Anamnese
                        </button>
                    </div>
                ) : (
                    <div>
                        <h3>Anamneses Registradas</h3>
                        <ul className="anamneses-list">
                            {anamneses.map((anamnese) => (
                                <li key={anamnese.id} className="anamnese-item">
                                    <span>{anamnese.texto.slice(0, 30)}...</span>
                                    <button
                                        className="button-ver"
                                        onClick={() => handleSaveAnamnese()}
                                    >
                                        <FaFilePdf /> Ver
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button className="button-nova-anamnese" onClick={() => setNewAnamnese(true)}>
                            <FaPlusCircle /> Nova Anamnese
                        </button>
                    </div>
                )}

                {newAnamnese && (
                    <div className="anamnese-editor">
                        <textarea
                            value={anamneseText}
                            onChange={(e) => setAnamneseText(e.target.value)}
                            placeholder="Digite a anamnese aqui..."
                        />
                        <button className="button-save" onClick={handleCreateAnamnese}>
                            Salvar Anamnese
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnamneseModal;
