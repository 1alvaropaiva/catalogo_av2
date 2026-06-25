/**
 * Arquivo: ProductDetail.tsx
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
import {type SyntheticEvent, useState} from 'react'
import type {Product, ProductPayload} from '../../types/product.ts'
import {useNavigate} from "react-router-dom";
import {atualizarProduto, deletarProduto} from "../../api/produtos.ts";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from "../ui/Button.tsx";
import ConfirmDeleteModal from "./modals/ConfirmDeleteModal.tsx";
import EditProductModal from "./modals/EditProductModal.tsx";

interface ProductDetailProps {
  product: Product
  onBack: () => void
}

const PLACEHOLDER_IMAGE = 'https://placehold.co/1000x600/e2e8f0/64748b?text=Sem+Imagem'

function ProductDetail({ product, onBack }: ProductDetailProps) {
  const navigate =
      useNavigate()

  const [
    showActions,
    setShowActions,
  ] =
      useState(false)

  const [
    showEdit,
    setShowEdit,
  ] =
      useState(false)

  const [
    showDelete,
    setShowDelete,
  ] =
      useState(false)

  const [
    loading,
    setLoading,
  ] =
      useState(false)

  const handleDelete =
      async (): Promise<void> => {

        setLoading(true)

        try {

          await deletarProduto(
              product.id,
          )

          navigate('/')

        } finally {

          setLoading(false)

        }

      }

  const handleUpdate =
      async (
          payload: ProductPayload,
      ): Promise<void> => {

        setLoading(true)

        try {

          await atualizarProduto(
              product.id,
              payload,
          )

          setShowEdit(false)

          window.location.reload()

        } finally {

          setLoading(false)

        }

      }

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>): void => {
    event.currentTarget.onerror = null
    event.currentTarget.src = PLACEHOLDER_IMAGE
  }

  return (
      <>

        <article
            className="
        surface-card
        overflow-hidden

        md:grid
        md:grid-cols-2
      "
        >

          <img
              src={product.imagem || PLACEHOLDER_IMAGE}
              alt={product.nome}
              onError={handleImageError}
              className="
          h-[28vh]
          w-full
          shrink-0
          object-cover

          sm:h-[32vh]

          md:h-full
        "
          />

          <div
              className="
          flex
          min-h-0
          flex-1
          flex-col
          overflow-hidden

          p-4
          sm:p-6
          md:p-8
        "
          >

            <div className="mb-4 flex items-center justify-between">

              <Button
                  className="
              btn-primary
              flex
              w-fit
              items-center
              gap-2
            "
                  onClick={onBack}
              >
                <ArrowBackIcon fontSize="small" />
                Voltar
              </Button>

              <div className="relative">

                <Button
                    className="btn-primary"
                    onClick={() =>
                        setShowActions(
                            (prev) =>
                                !prev,
                        )
                    }
                >
                  <ArrowDownwardIcon />
                </Button>

                {showActions && (
                    <div
                        className="
                  absolute
                  right-0
                  top-full
                  z-10
                  mt-2
                  overflow-hidden
                  rounded-lg
                  border
                  border-[color:var(--color-border)]
                  bg-[color:var(--color-surface)]
                "
                    >

                      <Button
                          className="
                    block
                    w-full
                    px-4
                    py-3
                    text-left
                    hover:cursor-pointer
                  "
                          onClick={() => {

                            setShowEdit(
                                true,
                            )

                            setShowActions(
                                false,
                            )

                          }}
                      >
                        Editar
                      </Button>

                      <Button
                          className="
                    block
                    w-full
                    px-4
                    py-3
                    text-left
                    hover:cursor-pointer
                  "
                          onClick={() => {

                            setShowDelete(
                                true,
                            )

                            setShowActions(
                                false,
                            )

                          }}
                      >
                        Excluir
                      </Button>

                    </div>
                )}

              </div>

            </div>

            <span className="status-chip mb-2 w-fit">
          {product.categoria}
        </span>

            <h1
                className="
            text-2xl
            font-bold
            text-[color:var(--color-text)]

            md:text-3xl
          "
            >
              {product.nome}
            </h1>

            <p
                className="
            mt-2
            text-lg
            font-semibold
            text-[color:var(--color-primary)]

            md:text-xl
          "
            >
              R$ {product.preco.toFixed(2)}
            </p>

            <section
                className="
            mt-4
            flex
            min-h-0
            flex-1
            flex-col
          "
            >

              <h2
                  className="
              text-sm
              font-semibold
              uppercase
              tracking-wide
              text-[color:var(--color-text-muted)]
            "
              >
                Descrição
              </h2>

              <p
                  className="
              mt-2
              overflow-y-auto
              leading-relaxed
              text-[color:var(--color-text)]

              md:overflow-visible
            "
              >
                {product.descricao}
              </p>

            </section>

          </div>

        </article>

        {showEdit && (
            <EditProductModal
                product={
                  product
                }
                isSaving={
                  loading
                }
                onClose={() =>
                    setShowEdit(
                        false,
                    )
                }
                onSave={
                  handleUpdate
                }
            />
        )}

        {showDelete && (
            <ConfirmDeleteModal
                productName={
                  product.nome
                }
                isDeleting={
                  loading
                }
                onCancel={() =>
                    setShowDelete(
                        false,
                    )
                }
                onConfirm={() =>
                    void handleDelete()
                }
            />
        )}
      </>
  )
}

export default ProductDetail