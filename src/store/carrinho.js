import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PRODUTOS } from '../lib/catalogo'

// Guarda só slug + quantidade; preço e nome vêm sempre do catálogo atual
export const useCarrinho = create(
  persist(
    (set) => ({
      itens: {}, // { [slug]: quantidade }
      adicionar: (slug, qtd = 1) =>
        set((s) => ({ itens: { ...s.itens, [slug]: (s.itens[slug] || 0) + qtd } })),
      definir: (slug, qtd) =>
        set((s) => {
          const itens = { ...s.itens }
          if (qtd <= 0) delete itens[slug]
          else itens[slug] = qtd
          return { itens }
        }),
      limpar: () => set({ itens: {} }),
    }),
    { name: 'vitrine-carrinho' }
  )
)

export const useLinhasCarrinho = () => {
  const itens = useCarrinho((s) => s.itens)
  const linhas = Object.entries(itens)
    .map(([slug, qtd]) => ({ produto: PRODUTOS.find((p) => p.slug === slug), qtd }))
    .filter((l) => l.produto)
  const total = linhas.reduce((t, l) => t + l.produto.preco * l.qtd, 0)
  const quantidade = linhas.reduce((t, l) => t + l.qtd, 0)
  return { linhas, total, quantidade }
}
