import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import CardProduto from '../components/CardProduto'
import { IconeFiltro } from '../components/Icones'
import { CATEGORIAS, MARCAS, PRECO_MAX, PRODUTOS, contarPorCategoria, moeda } from '../lib/catalogo'

const ORDENS = {
  vendas: { rotulo: 'Mais pedidos', fn: (a, b) => b.vendas - a.vendas },
  menor: { rotulo: 'Menor preço', fn: (a, b) => a.preco - b.preco },
  maior: { rotulo: 'Maior preço', fn: (a, b) => b.preco - a.preco },
  az: { rotulo: 'A–Z', fn: (a, b) => a.nome.localeCompare(b.nome, 'pt-BR') },
}

const normalizar = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export default function Catalogo() {
  const [params, setParams] = useSearchParams()
  const [filtrosAbertos, setFiltrosAbertos] = useState(false)

  const marca = params.get('marca') || 'Todas'
  const categorias = params.get('categoria')?.split(',').filter(Boolean) || []
  const precoMax = Number(params.get('preco')) || PRECO_MAX
  const ordem = ORDENS[params.get('ordem')] ? params.get('ordem') : 'vendas'
  const q = params.get('q') || ''

  const atualizar = (chave, valor) => {
    const p = new URLSearchParams(params)
    if (valor === null || valor === '' || valor === undefined) p.delete(chave)
    else p.set(chave, valor)
    setParams(p, { replace: true })
  }

  const alternarCategoria = (c) => {
    const novas = categorias.includes(c) ? categorias.filter((x) => x !== c) : [...categorias, c]
    atualizar('categoria', novas.join(','))
  }

  const lista = useMemo(() => {
    const termo = normalizar(q.trim())
    return PRODUTOS.filter((p) =>
      (marca === 'Todas' || p.marca === marca) &&
      (categorias.length === 0 || categorias.includes(p.categoria)) &&
      p.preco <= precoMax &&
      (!termo || normalizar(`${p.nome} ${p.marca} ${p.categoria}`).includes(termo))
    ).sort(ORDENS[ordem].fn)
  }, [marca, categorias.join(','), precoMax, ordem, q])

  const temFiltro = marca !== 'Todas' || categorias.length || precoMax < PRECO_MAX || q

  return (
    <>
      <div className="wrap crumbs"><Link to="/">Início</Link> / Catálogo</div>

      <section className="wrap page-title">
        <h1>{q ? `Resultados para “${q}”` : 'Catálogo'}</h1>
        <p>{PRODUTOS.length} produtos de {MARCAS.length} marcas.</p>
        <div role="group" aria-label="Filtrar por marca" className="chips">
          {[{ nome: 'Todas', total: PRODUTOS.length }, ...MARCAS].map((m) => (
            <button key={m.nome} type="button" className="chip" aria-pressed={marca === m.nome}
              onClick={() => atualizar('marca', m.nome === 'Todas' ? null : m.nome)}>
              {m.nome} <span className="mono">{m.total}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="wrap catalog">
        <button type="button" className="btn btn-ghost btn-sm filters-toggle" aria-expanded={filtrosAbertos} aria-controls="filtros"
          onClick={() => setFiltrosAbertos((v) => !v)}>
          <IconeFiltro /> {filtrosAbertos ? 'Fechar filtros' : 'Filtrar'}
        </button>

        <aside id="filtros" aria-label="Filtros" className={`filters${filtrosAbertos ? ' open' : ''}`}>
          <fieldset>
            <legend>Categoria</legend>
            {CATEGORIAS.map((c) => (
              <label key={c} className="check">
                <input type="checkbox" checked={categorias.includes(c)} onChange={() => alternarCategoria(c)} />
                <span>{c}</span>
                <span className="mono">{contarPorCategoria(c)}</span>
              </label>
            ))}
          </fieldset>
          <div>
            <label htmlFor="preco" className="label" style={{ display: 'block' }}>Preço até {moeda(precoMax)}</label>
            <input id="preco" className="range" type="range" min="0" max={PRECO_MAX} step="5" value={precoMax}
              onChange={(e) => atualizar('preco', Number(e.target.value) >= PRECO_MAX ? null : e.target.value)} />
            <div className="range-legend"><span>R$ 0</span><span>{moeda(PRECO_MAX).replace(',00', '')}</span></div>
          </div>
          {temFiltro && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setParams({}, { replace: true })}>Limpar filtros</button>
          )}
        </aside>

        <section aria-label="Produtos" className="results">
          <div className="results-bar">
            <span aria-live="polite">Mostrando {lista.length} de {PRODUTOS.length}</span>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>Ordenar
              <select className="select" value={ordem} onChange={(e) => atualizar('ordem', e.target.value === 'vendas' ? null : e.target.value)}>
                {Object.entries(ORDENS).map(([k, o]) => <option key={k} value={k}>{o.rotulo}</option>)}
              </select>
            </label>
          </div>
          {lista.length ? (
            <div className="grid-products">
              {lista.map((p) => <CardProduto key={p.slug} produto={p} comQuantidade />)}
            </div>
          ) : (
            <div className="empty">
              <p style={{ margin: '0 0 12px' }}>Nenhum produto com esses filtros.</p>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setParams({}, { replace: true })}>Ver todos</button>
            </div>
          )}
        </section>
      </div>
    </>
  )
}
