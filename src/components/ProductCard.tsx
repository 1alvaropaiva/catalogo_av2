import { Link } from 'react-router-dom'
import type { SyntheticEvent } from 'react'
import type { Product } from '../types/product'

/** Propriedades necessárias para renderizar um card de produto. */
interface ProductCardProps {
  /** Produto já normalizado para exibição. */
  product: Product
}

// Imagem de fallback usada quando a URL do produto está ausente ou quebra.
const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400/e2e8f0/64748b?text=Sem+Imagem'

// Card de resumo com imagem, preço, categoria e link para detalhes.
function ProductCard({ product }: ProductCardProps) {
  // Troca a imagem por um placeholder para evitar ícones de imagem quebrada.
  const handleImageError = (event: SyntheticEvent<HTMLImageElement>): void => {
    event.currentTarget.onerror = null
    event.currentTarget.src = PLACEHOLDER_IMAGE
  }

  return (
    <article className="surface-card flex h-full flex-col overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <img
        src={product.imagem || PLACEHOLDER_IMAGE}
        alt={product.nome}
        onError={handleImageError}
        className="h-48 w-full object-cover"
        loading="lazy"
      />

      <div className="flex h-full flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="status-chip">{product.categoria}</span>
          <p className="text-lg font-semibold text-[color:var(--color-primary)]">R$ {product.preco.toFixed(2)}</p>
        </div>

        <h3 className="text-lg font-semibold text-[color:var(--color-text)]">{product.nome}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-[color:var(--color-text-muted)]">{product.descricao}</p>

        <div className="mt-5 flex-grow" />

        <Link to={`/produto/${product.id}`} className="btn-primary mt-3 inline-flex justify-center">
          Ver detalhes
        </Link>
      </div>
    </article>
  )
}

export default ProductCard
