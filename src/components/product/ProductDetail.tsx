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
    <article className="surface-card overflow-hidden p-0">
      <div className="grid md:grid-cols-2">
        <img
          src={product.imagem || PLACEHOLDER_IMAGE}
          alt={product.nome}
          onError={handleImageError}
          className="h-64 w-full object-cover sm:h-80 md:h-full"
        />

        <div className="flex flex-col p-6 sm:p-8">

          <div className="mb-5 flex items-center justify-between">

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
                        (
                            prev,
                        ) =>
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
                      mt-2
                      z-10
                      rounded-lg
                      overflow-hidden
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