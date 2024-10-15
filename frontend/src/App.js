// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TabelaProdutos from './components/TabelaProdutos';
import AdicionarProduto from './components/AdicionarProduto';
import RemoverProduto from './components/RemoverProduto';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <nav className="menu">
            <ul>
              <li><Link to="/">Início</Link></li>
              <li><Link to="/adicionar">Adicionar</Link></li>
              <li><Link to="/remover">Remover</Link></li>
            </ul>
          </nav>
        </header>
        <main className="app-body">
          <Routes>
            <Route path="/" element={<TabelaProdutos />} />
            <Route path="/adicionar" element={<AdicionarProduto />} />
            <Route path="/remover" element={<RemoverProduto />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
