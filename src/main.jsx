import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import Carrinho from './pages/Carrinho'
import './styles.css'

function NaoEncontrada() {
  return (
    <section className="wrap" style={{ paddingBlock: 64 }}>
      <div className="empty">
        <h1 style={{ fontSize: 28, color: 'var(--ink)', marginBottom: 8 }}>Página não encontrada</h1>
        <Link to="/" className="btn btn-primary">Voltar pro início</Link>
      </div>
    </section>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalogo" element={<Catalogo />} />
          <Route path="carrinho" element={<Carrinho />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
