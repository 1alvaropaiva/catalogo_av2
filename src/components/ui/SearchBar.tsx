/** Propriedades para controlar os filtros da busca de produtos. */
interface SearchBarProps {
  /** Texto atual digitado para busca por nome. */
  searchTerm: string
  /** Categoria atualmente selecionada no filtro. */
  selectedCategory: string
  /** Lista de categorias disponíveis no momento. */
  categories: string[]
  /** Atualiza o termo de busca conforme o usuário digita. */
  onSearchTermChange: (value: string) => void
  /** Atualiza a categoria selecionada no filtro. */
  onCategoryChange: (value: string) => void
}

// Barra de filtros da página inicial (nome + categoria).
function SearchBar({
  searchTerm,
  selectedCategory,
  categories,
  onSearchTermChange,
  onCategoryChange,
}: SearchBarProps) {
  return (
    <section className="surface-card">
      <div className="grid gap-4 md:grid-cols-2">
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
            className="field-input"
          >
            <option value="">Todas as categorias</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  )
}

export default SearchBar
