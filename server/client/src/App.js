import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/authpage';
import Dashboard from './pages/dashboard';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
