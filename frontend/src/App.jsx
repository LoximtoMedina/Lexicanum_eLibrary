// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Colecciones from './pages/Colecciones';
import Editoriales from './pages/Editoriales'; 
import Libros from './pages/Libros'; 
import Universidades from './pages/Universidades';
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
            <Route path="/libros" element={<Libros />} /> 
            <Route path="/universidades" element={<Universidades />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;