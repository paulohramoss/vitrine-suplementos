import { useState } from 'react'
import FotoProduto from './FotoProduto'
import { moeda, parcela, LOJA } from '../lib/catalogo'
import { useCarrinho } from '../store/carrinho'

export default function CardProduto({ produto, comQuantidade = false }) {
  const adicionar = useCarrinho((s) => s.adicionar)
  const [qtd, setQtd] = useState(1)
  const [ok, setOk] = useState(false)

  const comprar = () => {
    adicionar(produto.slug, comQuantidade ? qtd : 1)
    setOk(true)
    setQtd(1)
    setTimeout(() => setOk(false), 1400)
  }

  return (
    <article className="card">
      <div className="card-img"><FotoProduto produto={produto} /></div>
      <div className="card-body">
        <div className="card-brand">{produto.marca}</div>
        <h3 className="card-name" style={{ fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: 0 }}>{produto.nome}</h3>
        <div className="price">{moeda(produto.preco)}</div>
        <div className="installments">ou {LOJA.parcelas}x de {parcela(produto.preco)} sem juros</div>
        <div className="card-actions">
          {comQuantidade && (
            <div className="stepper">
              <button type="button" aria-label="Diminuir quantidade" onClick={() => setQtd((q) => Math.max(1, q - 1))}>−</button>
              <output aria-live="polite">{qtd}</output>
              <button type="button" aria-label="Aumentar quantidade" onClick={() => setQtd((q) => q + 1)}>+</button>
            </div>
          )}
          <button type="button" className={`btn btn-primary${ok ? ' added' : ''}`} onClick={comprar}>
            {ok ? 'Adicionado ✓' : comQuantidade ? 'Comprar' : 'Adicionar ao carrinho'}
          </button>
        </div>
      </div>
    </article>
  )
}
