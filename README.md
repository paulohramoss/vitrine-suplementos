# Vitrine Suplementos

Loja online de suplementos: catálogo com filtros, carrinho e pedido finalizado pelo WhatsApp.
React 19 + Vite + React Router + Zustand. Sem backend: os produtos ficam num JSON.

## Rodando

```bash
npm install
cp .env.example .env   # coloque o número do WhatsApp
npm run dev
```

Build de produção: `npm run build` (sai em `dist/`). Já tem `vercel.json` pro roteamento SPA, é só importar o repo na Vercel e configurar as variáveis.

## Configuração

| Variável | O que é |
| --- | --- |
| `VITE_WHATSAPP` | Número que recebe os pedidos, só dígitos com DDI+DDD (ex.: `5549999999999`) |
| `VITE_WHATSAPP_COMERCIAL` | Número do comercial pros revendedores (opcional, cai no de cima) |

Razão social, CNPJ e horário ficam em `src/lib/catalogo.js` (objeto `LOJA`).

## Produtos

Edite `src/data/produtos.json`:

```json
{ "slug": "creatine-300g", "nome": "Creatine 300g", "marca": "Vitafor", "categoria": "Creatina", "preco": 71.05, "vendas": 88, "vitrine": true }
```

- `slug`: identificador único, também é o nome da foto.
- `categoria`: uma das listadas em `CATEGORIAS` (`src/lib/catalogo.js`).
- `vendas`: usado pra ordenar "Mais pedidos" e montar a seção da home.
- `vitrine`: marque 2 produtos pra aparecerem no topo da home.

Marcas, contagens e preço máximo do filtro são calculados automaticamente.

### Fotos

Coloque em `public/produtos/<slug>.jpg` (quadrada, fundo branco, ~800×800). Sem foto, aparece um placeholder com o nome da marca.

## Cores

Tudo em variáveis CSS no topo de `src/styles.css`:
- `--accent` laranja `#C2410C`: logo, links, nome da marca
- `--button` verde `#2A8533`: botões, seletores, filtro ativo e barra de preço
- `--ink` grafite `#1C1917`: texto e faixas escuras

## Estrutura

```
src/
  data/produtos.json      catálogo
  lib/catalogo.js         dados da loja, formatação, link do WhatsApp
  store/carrinho.js       carrinho (Zustand, salvo no localStorage)
  components/             Layout (topo, header, footer), CardProduto, FotoProduto, ícones
  pages/                  Home, Catalogo, Carrinho
```

Os filtros do catálogo ficam na URL (`/catalogo?marca=Vitafor&categoria=Creatina&preco=100&ordem=menor&q=whey`), então dá pra compartilhar link filtrado.
