import { useState } from 'react';
// 1. Importando o nosso mensageiro Axios configurado
import api from '../services/api';

export default function Dashboard() {
    const [arquivo, setArquivo] = useState(null);
    const [relatorio, setRelatorio] = useState('');
    const [carregando, setCarregando] = useState(false);

    const handleFileChange = (e) => {
        setArquivo(e.target.files[0]);
    };

    // 2. A palavra "async" avisa que essa função vai ter pausas (esperar a internet)
    const handleUpload = async (e) => {
        e.preventDefault();

        if (!arquivo) {
            alert("Por favor, selecione uma planilha primeiro.");
            return;
        }

        setCarregando(true);
        setRelatorio('');

        // 3. Empacotando o arquivo para envio (FormData)
        const formData = new FormData();
        formData.append('planilha', arquivo);

        // 4. Tentando enviar para o Back-end
        try {
            // O "await" manda o código pausar e esperar a resposta do servidor
            const resposta = await api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Se deu certo, pegamos o texto que a IA gerou lá no servidor
            setRelatorio(resposta.data.narrativa);

        } catch (erro) {
            console.error("Erro ao processar:", erro);
            alert("Falha ao gerar o relatório. Verifique a planilha ou o servidor.");
        } finally {
            // O "finally" sempre roda no final, dando certo ou errado, para liberar o botão
            setCarregando(false);
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h2>Dashboard - BI Narrativo</h2>
            <p>Faça o upload da planilha de vendas exportada do SAP.</p>

            <form onSubmit={handleUpload} style={{
                border: '2px dashed #ccc', padding: '30px', borderRadius: '8px', marginTop: '20px'
            }}>

                <div style={{ marginBottom: '20px' }}>
                    <input type="file" accept=".xlsx, .csv" onChange={handleFileChange} />
                </div>

                <button
                    type="submit"
                    disabled={carregando}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: carregando ? '#ccc' : '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: carregando ? 'not-allowed' : 'pointer'
                    }}
                >
                    {carregando ? 'Processando com IA...' : 'Gerar Relatório'}
                </button>

            </form>

            {relatorio && (
                <div style={{
                    marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderLeft: '5px solid #007bff', lineHeight: '1.6'
                }}>
                    <h3>Narrativa Gerada:</h3>
                    <p>{relatorio}</p>
                </div>
            )}
        </div>
    );
}