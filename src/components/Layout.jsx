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
          <img src="/marca/bz-logo-horizontal.svg" alt={LOJA.nome} className="logo-img" width="220" height="40" />
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
        <div><img src="/marca/bz-logo-horizontal.svg" alt={LOJA.nome} className="footer-logo" width="165" height="30" loading="lazy" /><span>{LOJA.razaoSocial}</span><span>CNPJ {LOJA.cnpj}</span></div>
        <div><strong>Atendimento</strong><span><a href={`https://wa.me/${LOJA.whatsapp}`} target="_blank" rel="noreferrer">{LOJA.whatsappExibicao}</a></span><span>{LOJA.horario}</span></div>
        <div><strong>Pagamento</strong><span>Pix ou cartão em {LOJA.parcelas}x sem juros</span></div>
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
        </div>
      </div>
      <Header />
      <main><Outlet /></main>
      <Footer />
      <CarrinhoFlutuante />
    </>
  )
}
