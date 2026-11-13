import { useState } from 'react'
import { imagemDe } from '../lib/catalogo'

// Mostra a foto de /public/produtos/<slug>.jpg; se não existir, um placeholder com a marca
export default function FotoProduto({ produto, eager = false }) {
  const [falhou, setFalhou] = useState(false)
  if (falhou) {
    return (
      <div className="ph" role="img" aria-label={`${produto.nome}, foto em breve`}>
        {produto.marca}
      </div>
    )
  }
  return (
    <img
      src={imagemDe(produto)}
      alt={`${produto.nome}, ${produto.marca}`}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFalhou(true)}
    />
  )
}
