import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota padrão redireciona para o login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Nossas duas telas principais */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}