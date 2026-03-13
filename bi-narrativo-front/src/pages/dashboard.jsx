import { useState } from 'react';

export default function Dashboard() {
    // 1. Nossos "blocos de notas" (Estados)
    const [arquivo, setArquivo] = useState(null);
    const [relatorio, setRelatorio] = useState('');
    const [carregando, setCarregando] = useState(false);

    // 2. Função que "escuta" quando o usuário escolhe um arquivo
    const handleFileChange = (e) => {
        // e.target.files é uma lista. Pegamos o primeiro arquivo [0]
        setArquivo(e.target.files[0]);
    };

    // 3. O que acontece ao clicar em "Gerar Relatório"
    const handleUpload = (e) => {
        e.preventDefault(); // Segurando a página para não recarregar!

        if (!arquivo) {
            alert("Por favor, selecione uma planilha primeiro.");
            return;
        }

        setCarregando(true);
        setRelatorio(''); // Limpa o relatório anterior, se houver

        // SIMULAÇÃO: Aqui entrará a chamada real para a sua API em Python no futuro.
        // Estamos usando um "setTimeout" para fingir que a IA está pensando por 2 segundos.
        setTimeout(() => {
            setCarregando(false);
            setRelatorio(
                "Resumo Executivo: O sell-out da marca X caiu 15% neste mês. A margem de lucro no canal marketplace ficou 5% abaixo da meta devido ao aumento das taxas logísticas. Destaque positivo para a linha Y que superou as expectativas."
            );
        }, 2000);
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h2>Dashboard - BI Narrativo</h2>
            <p>Faça o upload da planilha de vendas exportada do SAP.</p>

            {/* Formulário de Upload */}
            <form onSubmit={handleUpload} style={{
                border: '2px dashed #ccc',
                padding: '30px',
                borderRadius: '8px',
                marginTop: '20px'
            }}>

                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="file"
                        accept=".xlsx, .csv" // Restringe os formatos aceitos
                        onChange={handleFileChange}
                    />
                </div>

                <button
                    type="submit"
                    disabled={carregando} // Desabilita o botão enquanto carrega
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

            {/* Renderização Condicional: Só aparece se houver um relatório */}
            {relatorio && (
                <div style={{
                    marginTop: '30px',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderLeft: '5px solid #007bff',
                    lineHeight: '1.6'
                }}>
                    <h3>Narrativa Gerada:</h3>
                    <p>{relatorio}</p>
                </div>
            )}

        </div>
    );
}