import type { SyntheticEvent } from 'react'
import type { Product } from '../types/product'

/** Propriedades da visualização detalhada de um produto. */
interface ProductDetailProps {
  /** Produto selecionado para exibição completa. */
  product: Product
  /** Ação para retornar à tela anterior. */
  onBack: () => void
}

// Imagem padrão para evitar layout quebrado em caso de URL inválida/ausente.
const PLACEHOLDER_IMAGE = 'https://placehold.co/1000x600/e2e8f0/64748b?text=Sem+Imagem'

// Exibe os dados completos do produto e permite voltar para a navegação anterior.
function ProductDetail({ product, onBack }: ProductDetailProps) {
  // Fallback visual de imagem para preservar a experiência da página de detalhes.
  const handleImageError = (event: SyntheticEvent<HTMLImageElement>): void => {
    event.currentTarget.onerror = null
    event.currentTarget.src = PLACEHOLDER_IMAGE
  }

  return (
    <article className="surface-card overflow-hidden p-0">
      <div className="grid md:grid-cols-2">
        <img
          src={product.imagem || PLACEHOLDER_IMAGE}
          alt={product.nome}
          onError={handleImageError}
          className="h-full min-h-64 w-full object-cover"
        />

        <div className="flex flex-col p-6 sm:p-8">
          <button type="button" className="btn-secondary mb-5 w-fit" onClick={onBack}>
            ← Voltar
          </button>

          <span className="status-chip mb-3 w-fit">{product.categoria}</span>
          <h1 className="text-3xl font-bold text-[color:var(--color-text)]">{product.nome}</h1>
          <p className="mt-3 text-xl font-semibold text-[color:var(--color-primary)]">R$ {product.preco.toFixed(2)}</p>

          <section className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[color:var(--color-text-muted)]">Descrição</h2>
            <p className="mt-2 leading-relaxed text-[color:var(--color-text)]">{product.descricao}</p>
          </section>
        </div>
      </div>
    </article>
  )
}

export default ProductDetail
