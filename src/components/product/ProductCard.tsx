/**
 * Arquivo: ProductCard.tsx
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
import { useNavigate } from 'react-router-dom'
import type { SyntheticEvent } from 'react'
import type { Product } from '../../types/product.ts'
import Button from "../ui/Button.tsx";

interface ProductCardProps {
  product: Product
}

const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400/e2e8f0/64748b?text=Sem+Imagem'

function ProductCard({ product }: ProductCardProps) {
  const handleImageError = (event: SyntheticEvent<HTMLImageElement>): void => {
    event.currentTarget.onerror = null
    event.currentTarget.src = PLACEHOLDER_IMAGE
  }
  const navigate = useNavigate()

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

        <Button
            type="button"
            className="btn-primary mt-3 inline-flex justify-center"
            onClick={() => navigate(`/produto/${product.id}`)}
        >
          Ver detalhes
        </Button>
      </div>
    </article>
  )
}

export default ProductCard
