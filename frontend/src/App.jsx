// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Colecciones from './pages/Colecciones';
import Editoriales from './pages/Editoriales'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="lexi-app">
        <NavBar /> 
      
        <main className="lexi-main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/colecciones" element={<Colecciones />} />
            <Route path="/editoriales" element={<Editoriales />} />
            {/* Aquí podrás ir agregando las rutas de Editoriales, Universidades, etc. */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;