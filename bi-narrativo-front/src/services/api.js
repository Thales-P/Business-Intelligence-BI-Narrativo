import axios from 'axios';

// 1. Criamos uma "instância" personalizada do caminhão
const api = axios.create({
    // Este será o endereço local da nossa API em Python (FastAPI) que faremos depois
    baseURL: 'http://localhost:8000',
});

// 2. (Opcional por enquanto) Aqui é onde colocaríamos o Token JWT no futuro
// para provar que o usuário está logado em todas as requisições.
api.interceptors.request.use(async config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;