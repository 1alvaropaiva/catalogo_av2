/**
 * Arquivo: SearchBar.tsx
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
import Button from './Button'

interface SearchBarProps {
  searchTerm: string
  selectedCategory: string
  categories: string[]
  onSearchTermChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onSearch: () => void
}

function SearchBar({
                     searchTerm,
                     selectedCategory,
                     categories,
                     onSearchTermChange,
                     onCategoryChange,
                     onSearch,
                   }: SearchBarProps) {
  return (
      <section className="surface-card mt-4">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">

          <label className="block">
            <span className="field-label">Buscar por nome</span>

            <input
                type="search"
                value={searchTerm}
                onChange={(event) => onSearchTermChange(event.target.value)}
                placeholder="Ex.: Teclado mecânico"
                className="field-input"
            />
          </label>

          <label className="block">
            <span className="field-label">Filtrar por categoria</span>

            <select
                value={selectedCategory}
                onChange={(event) => onCategoryChange(event.target.value)}
                className="field-input hover:cursor-pointer"
            >
              <option value="">Todas as categorias</option>

              {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
              ))}
            </select>
          </label>

          <div className="flex justify-center md:justify-start">
            <Button
                onClick={onSearch}
                className="
              w-full max-w-[160px]
              md:w-auto md:max-w-none
              rounded px-4 py-2
              transition
              btn-primary
            "
            >
              Buscar
            </Button>
          </div>

        </div>
      </section>
  )
}

export default SearchBar