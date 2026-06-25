/**
 * Arquivo: Home.tsx
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
import { getCategorias, getProdutos } from '../api/produtos.ts'
import { useEffect, useState } from 'react'
import type { Product } from '../types/product.ts'

import SearchBar from '../components/ui/SearchBar.tsx'
import Loading from '../states/Loading.tsx'
import ProductList from '../components/product/ProductList.tsx'

const ITEMS_PER_PAGE = 6

function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    let isActive = true

    const loadCategories = async (): Promise<void> => {
      try {
        const data = await getCategorias()

        if (isActive) {
          setCategories(data)
        }
      } catch (error) {
        console.error('Erro ao carregar categorias', error)
      }
    }

    void loadCategories()

    return () => {
      isActive = false
    }
  }, [])

  const handleSearch = async (): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await getProdutos({
        nome: searchTerm,
        categoria: selectedCategory,
      })

      setProducts(data)

      setCurrentPage(1)

    } catch {
      setError(
          'Não foi possível carregar os produtos. Verifique a conexão e tente novamente.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleRetry = async (): Promise<void> => {
    await handleSearch()
  }

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)

  const paginatedProducts = products.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE,
  )

  return (
      <div className="space-y-8">

        <section>
          <h1 className="text-3xl font-bold">
            Catálogo de Produtos
          </h1>

          <p className="mt-2 text-sm text-[color:var(--color-text-muted)] sm:text-base">
            Explore os itens disponíveis, filtre por categoria e encontre produtos pelo nome.
          </p>

          <SearchBar
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              categories={categories}
              onSearchTermChange={setSearchTerm}
              onCategoryChange={setSelectedCategory}
              onSearch={handleSearch}
          />
        </section>

        <div className="flex flex-wrap items-center justify-between gap-3">
          {isLoading ? (
              <Loading
                  message="Carregando produtos..."
                  size="h-4 w-4"
                  containerClassName="flex items-center gap-2"
                  textClassName="text-sm text-[color:var(--color-text-muted)]"
              />
          ) : (
              <p className="text-sm text-[color:var(--color-text-muted)]">
                {products.length} produto(s) encontrado(s)
              </p>
          )}
        </div>

        <ProductList
            products={paginatedProducts}
            isLoading={isLoading}
            error={error}
            onRetry={() => void handleRetry()}
        />

        {!isLoading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-3">

              <button
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={currentPage === 1}
                  className="rounded border px-4 py-2 disabled:opacity-50 disabled:hover:cursor-auto hover:cursor-pointer"
              >
                Anterior
              </button>

              <span className="text-sm">
            Página {currentPage} de {totalPages}
          </span>

              <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded border px-4 py-2 disabled:opacity-50 disabled:hover:cursor-auto hover:cursor-pointer"
              >
                Próxima
              </button>

            </div>
        )}

      </div>
  )
}

export default Home