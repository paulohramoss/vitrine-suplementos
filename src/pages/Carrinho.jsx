import { useState } from 'react'
import { Link } from 'react-router-dom'
import FotoProduto from '../components/FotoProduto'
import { LOJA, linkWhatsApp, moeda } from '../lib/catalogo'
import { useCarrinho, useLinhasCarrinho } from '../store/carrinho'

export default function Carrinho() {
  const { linhas, total, quantidade } = useLinhasCarrinho()
  const definir = useCarrinho((s) => s.definir)
  const [dados, setDados] = useState({ nome: '', cidade: '', obs: '' })
  const campo = (k) => ({ value: dados[k], onChange: (e) => setDados({ ...dados, [k]: e.target.value }) })

  const mensagem = () => [
    `Olá! Quero fazer um pedido na ${LOJA.nome}:`,
    '',
    ...linhas.map((l) => `• ${l.qtd}x ${l.produto.nome} (${l.produto.marca}) — ${moeda(l.produto.preco * l.qtd)}`),
    '',
    `*Total: ${moeda(total)}*`,
    '',
    `Nome: ${dados.nome}`,
    `Cidade: ${dados.cidade}`,
    dados.obs.trim() ? `Obs.: ${dados.obs.trim()}` : null,
  ].filter((l) => l !== null).join('\n')

  const finalizar = (e) => {
    e.preventDefault()
    window.open(linkWhatsApp(LOJA.whatsapp, mensagem()), '_blank', 'noopener')
  }

  if (!linhas.length) {
    return (
      <section className="wrap" style={{ paddingBlock: '64px' }}>
        <div className="empty">
          <h1 style={{ fontSize: 28, color: 'var(--ink)', marginBottom: 8 }}>Seu carrinho está vazio</h1>
          <p style={{ margin: '0 0 16px' }}>Dá uma olhada no catálogo, tem whey, creatina e muito mais.</p>
          <Link to="/catalogo" className="btn btn-primary">Ver catálogo</Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <div className="wrap crumbs"><Link to="/">Início</Link> / Carrinho</div>
      <section className="wrap page-title">
        <h1>Seu pedido</h1>
        <p>{quantidade} {quantidade === 1 ? 'item' : 'itens'}. O atendente confirma estoque e frete pelo WhatsApp.</p>
      </section>

      <div className="wrap cart">
        <ul className="cart-list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {linhas.map(({ produto: p, qtd }) => (
            <li key={p.slug} className="cart-line">
              <div className="thumb"><FotoProduto produto={p} /></div>
              <div style={{ minWidth: 0 }}>
                <div className="card-brand">{p.marca}</div>
                <div style={{ fontWeight: 600 }}>{p.nome}</div>
                <div className="installments">{moeda(p.preco)} cada</div>
                <button type="button" className="remove" onClick={() => definir(p.slug, 0)}>Remover</button>
              </div>
              <div className="stepper">
                <button type="button" aria-label={`Diminuir ${p.nome}`} onClick={() => definir(p.slug, qtd - 1)}>−</button>
                <output aria-live="polite">{qtd}</output>
                <button type="button" aria-label={`Aumentar ${p.nome}`} onClick={() => definir(p.slug, qtd + 1)}>+</button>
              </div>
              <div className="price" style={{ fontSize: 18, margin: 0, textAlign: 'right' }}>{moeda(p.preco * qtd)}</div>
            </li>
          ))}
        </ul>

        <form className="summary" onSubmit={finalizar}>
          <div className="total"><span style={{ fontSize: 16 }}>Total</span><span>{moeda(total)}</span></div>
          <div className="installments">Pix ou dinheiro · frete combinado no atendimento</div>
          <label className="field">Seu nome<input required autoComplete="name" {...campo('nome')} /></label>
          <label className="field">Cidade / UF<input required autoComplete="address-level2" placeholder="Ex.: São Miguel do Oeste / SC" {...campo('cidade')} /></label>
          <label className="field">Observação (opcional)<textarea rows="2" placeholder="Sabor alternativo, melhor horário…" {...campo('obs')} /></label>
          {!LOJA.whatsapp && <p className="warn" style={{ margin: 0 }}>Configure o número em <code>VITE_WHATSAPP</code> no arquivo .env pra liberar o envio.</p>}
          <button type="submit" className="btn btn-primary btn-block" disabled={!LOJA.whatsapp}>Finalizar no WhatsApp →</button>
          <Link to="/catalogo" style={{ textAlign: 'center', fontSize: 14, fontWeight: 600 }}>Continuar comprando</Link>
        </form>
      </div>
    </>
  )
}
