import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { CATEGORIAS, LOJA, moeda } from '../lib/catalogo'
import { useLinhasCarrinho } from '../store/carrinho'
import { IconeBusca, IconeCarrinho } from './Icones'

function Busca() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') || '')
  useEffect(() => setQ(params.get('q') || ''), [params])

  const enviar = (e) => {
    e.preventDefault()
    navigate(q.trim() ? `/catalogo?q=${encodeURIComponent(q.trim())}` : '/catalogo')
  }
  return (
    <form role="search" className="search" onSubmit={enviar}>
      <IconeBusca />
      <label htmlFor="busca" className="sr-only">Buscar produtos</label>
      <input id="busca" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar whey, creatina, ômega, marca…" />
    </form>
  )
}

function Header() {
  const { quantidade } = useLinhasCarrinho()
  const [params] = useSearchParams()
  const catAtual = params.get('categoria')
  return (
    <header className="header">
      <div className="wrap header-row">
        <Link to="/" className="logo" aria-label={`${LOJA.nome}, início`}>
          <span className="logo-mark" aria-hidden="true">V</span>
          <span className="logo-name">{LOJA.nome}</span>
        </Link>
        <Busca />
        <nav aria-label="Atalhos" className="header-actions">
          <a href="#contato" className="link-plain">Atendimento</a>
          <Link to="/carrinho" className="btn btn-dark btn-sm" aria-label={`Carrinho com ${quantidade} ${quantidade === 1 ? 'item' : 'itens'}`}>
            <IconeCarrinho /> Carrinho {quantidade > 0 && <span className="badge-count">{quantidade}</span>}
          </Link>
        </nav>
      </div>
      <nav aria-label="Categorias" className="wrap nav-cats">
        {CATEGORIAS.map((c) => (
          <Link key={c} to={`/catalogo?categoria=${encodeURIComponent(c)}`} className={catAtual === c ? 'on' : ''}>{c}</Link>
        ))}
        <NavLink to="/catalogo" end className="strong">Todas as marcas</NavLink>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer" id="contato">
      <div className="wrap">
        <div><span className="logo-name">{LOJA.nome}</span><span>{LOJA.razaoSocial}</span><span>CNPJ {LOJA.cnpj}</span></div>
        <div><strong>Atendimento</strong><span>{LOJA.whatsapp ? `WhatsApp ${LOJA.whatsapp}` : '[SEU NÚMERO]'}</span><span>{LOJA.horario}</span></div>
        <div><strong>Pagamento</strong><span>Pix, cartão em {LOJA.parcelas}x e boleto para revendedores</span></div>
        <div><strong>Compra segura</strong><span>Nota fiscal em todo pedido · Política de trocas</span></div>
      </div>
    </footer>
  )
}

function CarrinhoFlutuante() {
  const { quantidade, total } = useLinhasCarrinho()
  const { pathname } = useLocation()
  const mostrar = quantidade > 0 && pathname !== '/carrinho'
  useEffect(() => {
    document.body.classList.toggle('has-float', mostrar)
  }, [mostrar])
  if (!mostrar) return null
  return (
    <Link to="/carrinho" className="float-cart">
      <span><small>{quantidade} {quantidade === 1 ? 'item' : 'itens'} no pedido</small><strong>{moeda(total)}</strong></span>
      <span style={{ fontWeight: 600, fontSize: 14 }}>Ver pedido →</span>
    </Link>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span>Produtos originais com nota fiscal · Envio para todo o Brasil</span>
          <span>Revendedor? Boleto a prazo — fale com o comercial</span>
        </div>
      </div>
      <Header />
      <main><Outlet /></main>
      <Footer />
      <CarrinhoFlutuante />
    </>
  )
}
