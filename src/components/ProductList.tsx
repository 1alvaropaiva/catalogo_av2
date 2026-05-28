import ErrorMessage from './ErrorMessage'
import Loading from './Loading'
import ProductCard from './ProductCard'
import type { Product } from '../types/product'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

/** Propriedades de controle para a listagem de produtos. */
interface ProductListProps {
  /** Lista já filtrada ou completa de produtos para renderização. */
  products: Product[]
  /** Estado de carregamento da operação principal de busca. */
  isLoading: boolean
  /** Mensagem de erro atual, caso a busca tenha falhado. */
  error: string | null
  /** Callback para repetir a ação de carregamento. */
  onRetry: () => void
}

// Decide qual estado da listagem exibir: loading, erro, vazio ou grade com cards.
function ProductList({ products, isLoading, error, onRetry }: ProductListProps) {
  if (isLoading) {
    return <Loading message="Buscando produtos..." />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />
  }

  if (products.length === 0) {
    return (
      <section className="surface-card py-12 text-center">
        <SentimentVeryDissatisfiedIcon
            className="!text-6xl"
            aria-hidden="true"
        />
        <h2 className="mt-4 text-xl font-semibold text-[color:var(--color-text)]">Nenhum produto encontrado</h2>
        <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">
          Tente ajustar os filtros de categoria e busca para encontrar resultados.
        </p>
      </section>
    )
  }

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3" aria-label="Lista de produtos">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}

export default ProductList
