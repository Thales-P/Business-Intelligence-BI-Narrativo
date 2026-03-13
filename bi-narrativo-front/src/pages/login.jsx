import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    // 1. Criando a "memória" do componente
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    // Ferramenta para mudar de página via código
    const navigate = useNavigate();

    // 2. O que acontece quando o usuário clica em "Entrar"
    const handleLogin = (e) => {
        e.preventDefault(); // Impede que a página recarregue (o segredo do SPA!)

        console.log("Tentando logar com:", email, senha);

        // Como ainda não temos o back-end, vamos simular que o login deu certo
        // e mandar o usuário direto para o painel principal.
        alert("Login simulado com sucesso!");
        navigate('/dashboard');
    };

    // 3. O visual da página
    return (
        <div style={{ padding: '50px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Acesso ao BI Narrativo</h2>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                <div>
                    <label>E-mail Corporativo:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <button type="submit" style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
                    Entrar
                </button>

            </form>
        </div>
    );
}