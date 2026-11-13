import produtos from '../data/produtos.json'

export const LOJA = {
  nome: 'Vitrine Suplementos',
  razaoSocial: '[RAZÃO SOCIAL]',
  cnpj: '[00.000.000/0001-00]',
  horario: 'Seg a sex, 8h às 18h',
  whatsapp: import.meta.env.VITE_WHATSAPP || '554988048588',
  whatsappExibicao: '(49) 8804-8588',
  parcelas: 3,
}

// Ordem fixa das categorias no menu e nos filtros
export const CATEGORIAS = [
  'Proteínas', 'Creatina', 'Pré-treino', 'Barras e snacks',
  'Ômega e óleos', 'Vitaminas e minerais', 'Sono',
]

export const PRODUTOS = produtos

export const MARCAS = Object.entries(
  produtos.reduce((acc, p) => ({ ...acc, [p.marca]: (acc[p.marca] || 0) + 1 }), {})
).map(([nome, total]) => ({ nome, total }))

export const contarPorCategoria = (cat) => produtos.filter((p) => p.categoria === cat).length

export const PRECO_MAX = Math.ceil(Math.max(...produtos.map((p) => p.preco)) / 50) * 50

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
export const moeda = (v) => brl.format(v)
export const parcela = (v) => moeda(v / LOJA.parcelas)

export const imagemDe = (p) => `/produtos/${p.slug}.jpg`

export const linkWhatsApp = (numero, texto) =>
  `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`
