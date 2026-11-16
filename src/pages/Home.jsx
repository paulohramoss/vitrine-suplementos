import { Link } from 'react-router-dom'
import CardProduto from '../components/CardProduto'
import FotoProduto from '../components/FotoProduto'
import { IconeCheck, IconeEscudo } from '../components/Icones'
import { LOJA, MARCAS, PRODUTOS, moeda } from '../lib/catalogo'

const CONFIANCA = [
  { titulo: 'Produtos originais', texto: 'Comprados direto das marcas.' },
  { titulo: 'Pedido pelo WhatsApp', texto: 'Um atendente confirma estoque e prazo com você.' },
  { titulo: 'Validade conferida', texto: 'Lotes recentes, conferidos antes do envio.' },
]

export default function Home() {
  const maisVendidos = [...PRODUTOS].sort((a, b) => b.vendas - a.vendas).slice(0, 4)
  // "vitrine": true no JSON escolhe os 2 produtos do topo; senão usa os mais vendidos
  const vitrine = PRODUTOS.filter((p) => p.vitrine)
  const [principal, segundo] = vitrine.length >= 2 ? vitrine : maisVendidos

  return (
    <>
      <section className="wrap hero">
        <div className="hero-text">
          <h1>Suplementos originais, com preço de quem compra direto.</h1>
          <p>Atendimento de verdade pelo WhatsApp, do pedido à entrega.</p>
          <ul className="hero-marcas" aria-label="Marcas disponíveis">
            {MARCAS.slice(0, 4).map((m) => <li key={m.nome}>{m.nome}</li>)}
            <li className="hero-marcas-mais">e mais</li>
          </ul>
          <div className="row">
            <Link to="/catalogo" className="btn btn-primary">Ver catálogo completo</Link>          </div>
          <div className="checks">
            <span><IconeCheck />{PRODUTOS.length} produtos em estoque</span>
            <span><IconeCheck />{LOJA.parcelas}x sem juros no cartão</span>
          </div>
        </div>

        <div className="hero-grid">
          <Link to={`/catalogo?q=${encodeURIComponent(principal.nome)}`} className="tile tile-tall">
            <div className="tile-img"><FotoProduto produto={principal} eager /></div>
            <div className="tile-meta">
              <div><div className="tile-brand">{principal.marca}</div><div className="tile-name">{principal.nome}</div></div>
              <div className="price tile-price">{moeda(principal.preco)}</div>
            </div>
          </Link>
          <Link to={`/catalogo?q=${encodeURIComponent(segundo.nome)}`} className="tile tile-tall">
            <div className="tile-img"><FotoProduto produto={segundo} eager /></div>
            <div className="tile-meta">
              <div><div className="tile-brand">{segundo.marca}</div><div className="tile-name">{segundo.nome}</div></div>
              <div className="price tile-price">{moeda(segundo.preco)}</div>
            </div>
          </Link>
        </div>
      </section>

      <section aria-label="Por que comprar aqui" className="trust">
        <div className="wrap">
          {CONFIANCA.map((c) => (
            <div key={c.titulo} className="trust-item">
              <span className="icon-box"><IconeEscudo /></span>
              <div><strong>{c.titulo}</strong><span>{c.texto}</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>Compre por marca</h2>
          <Link to="/catalogo">Ver todas</Link>
        </div>
        <div className="brands">
          {MARCAS.map((m) => (
            <Link key={m.nome} to={`/catalogo?marca=${encodeURIComponent(m.nome)}`} className="brand-card">
              <strong>{m.nome}</strong>
              <span className="mono">{m.total} {m.total === 1 ? 'item' : 'itens'}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <div>
            <h2>Mais pedidos da semana</h2>
            <p>Os campeões de venda da loja.</p>
          </div>
          <Link to="/catalogo">Ver catálogo</Link>
        </div>
        <div className="grid-products">
          {maisVendidos.map((p) => <CardProduto key={p.slug} produto={p} />)}
        </div>
      </section>
    </>
  )
}
