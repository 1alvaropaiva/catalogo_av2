/**
 * Arquivo: ProductList.tsx
 *
 * Responsabilidade:
 * Centraliza a responsabilidade principal deste módulo dentro do catálogo de produtos.
 *
 * Função dentro do sistema:
 * Atua como parte do fluxo de interface, estado ou integração conforme sua pasta (componentes, páginas, hooks, API, tipos, utilitários e validações).
 *
 * Entradas:
 * Recebe dados por props, parâmetros de função, estado local e/ou valores vindos de serviços e rotas.
 *
 * Saídas:
 * Retorna elementos de interface, resultados transformados, estados atualizados ou payloads para integração.
 *
 * Dependências:
 * Utiliza módulos internos do projeto e bibliotecas da stack React + TypeScript quando necessário.
 *
 * Fluxo:
 * Executa seu papel específico no ciclo de renderização, validação, transformação de dados ou comunicação com API.
 *
 * Observações:
 * Este cabeçalho foi adicionado para padronização documental sem alterar regras de negócio.
 */
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
