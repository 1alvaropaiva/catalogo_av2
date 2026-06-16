import ErrorMessage from '../../states/ErrorMessage.tsx'
import Loading from '../../states/Loading.tsx'
import ProductCard from './ProductCard.tsx'
import type { Product } from '../../types/product.ts'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

interface ProductListProps {
  products: Product[]
  isLoading: boolean
  error: string | null
  onRetry: () => void
}

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
