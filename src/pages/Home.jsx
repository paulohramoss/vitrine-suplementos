import { Link } from 'react-router-dom'
import CardProduto from '../components/CardProduto'
import FotoProduto from '../components/FotoProduto'
import { IconeCheck, IconeEscudo } from '../components/Icones'
import { LOJA, MARCAS, PRODUTOS, moeda } from '../lib/catalogo'

const CONFIANCA = [
  { titulo: 'Produtos originais', texto: 'Comprados direto das marcas, com nota fiscal.' },
  { titulo: 'Pedido pelo WhatsApp', texto: 'Um atendente confirma estoque e prazo com você.' },
  { titulo: 'Validade conferida', texto: 'Lotes recentes, conferidos antes do envio.' },
]

export default function Home() {
  const maisVendidos = [...PRODUTOS].sort((a, b) => b.vendas - a.vendas).slice(0, 4)
  // "vitrine": true no JSON escolhe os 2 produtos do topo; senão usa os mais vendidos
  const vitrine = PRODUTOS.filter((p) => p.vitrine)
  const [principal, segundo] = vitrine.length >= 2 ? vitrine : maisVendidos
  const nomesMarcas = MARCAS.slice(0, 4).map((m) => m.nome).join(', ')

  return (
    <>
      <section className="wrap hero">
        <div className="hero-text">
          <h1>Suplementos originais, com preço de quem compra direto.</h1>
          <p>{nomesMarcas} e mais. Nota fiscal em todo pedido e atendimento de verdade pelo WhatsApp.</p>
          <div className="row">
            <Link to="/catalogo" className="btn btn-primary">Ver catálogo completo</Link>          </div>
          <div className="checks">
            <span><IconeCheck />{PRODUTOS.length} produtos em estoque</span>
            <span><IconeCheck />{LOJA.parcelas}x sem juros no cartão</span>
          </div>
        </div>

        <div className="hero-grid">
          <Link to={`/catalogo?q=${encodeURIComponent(principal.nome)}`} className="tile tile-tall">
            <div style={{ aspectRatio: '1/1' }}><FotoProduto produto={principal} eager /></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 8 }}>
              <div><div className="muted" style={{ fontSize: 12 }}>{principal.marca}</div><div style={{ fontWeight: 600, fontSize: 15 }}>{principal.nome}</div></div>
              <div className="price" style={{ fontSize: 20, whiteSpace: 'nowrap', margin: 0 }}>{moeda(principal.preco)}</div>
            </div>
          </Link>
          <Link to={`/catalogo?q=${encodeURIComponent(segundo.nome)}`} className="tile" style={{ padding: 16, display: 'grid', placeItems: 'center', gridRow: 'span 2' }}>
            <div style={{ width: '100%', maxWidth: 200, aspectRatio: '1/1' }}><FotoProduto produto={segundo} eager /></div>
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
