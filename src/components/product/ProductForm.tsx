import Button from '../ui/Button.tsx'
import { useProductForm } from '../../hooks/useProductForm.ts'

import type {
    ProductPayload,
} from '../../types/product.ts'

interface ProductFormProps {
    onSubmit: (
        data: ProductPayload,
    ) => Promise<void>

    isSubmitting: boolean
}

function ProductForm({
                         onSubmit,
                         isSubmitting,
                     }: ProductFormProps) {

    const {
        values,
        errors,
        imageMode,

        handleSubmit,
        handleFieldChange,
        handleImageChange,
        changeImageMode,
    } =
        useProductForm({
            onSubmit,
        })

  return (
    <form className="surface-card space-y-5 mt-4" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="nome" className="field-label">
          Nome
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          className="field-input"
          placeholder="Ex.: Headset sem fio"
          value={values.nome}
          onChange={handleFieldChange}
        />
        {errors.nome && <p className="field-error">{errors.nome}</p>}
      </div>

      <div>
        <label htmlFor="preco" className="field-label">
          Preço
        </label>
        <input
          id="preco"
          name="preco"
          type="number"
          min="0"
          step="0.01"
          className="field-input"
          placeholder="Ex.: 199.90"
          value={values.preco}
          onChange={handleFieldChange}
        />
        {errors.preco && <p className="field-error">{errors.preco}</p>}
      </div>

      <div>
        <label htmlFor="descricao" className="field-label">
          Descrição
        </label>
        <textarea
          id="descricao"
          name="descricao"
          rows={4}
          className="field-textarea"
          placeholder="Descreva os principais pontos do produto..."
          value={values.descricao}
          onChange={handleFieldChange}
        />
        {errors.descricao && <p className="field-error">{errors.descricao}</p>}
      </div>

      <div>
        <label className="field-label">
          Imagem
        </label>

        {/* INPUT PRIMEIRO */}
        {imageMode === 'url' ? (
            <>
              <input
                  id="imagem"
                  name="imagem"
                  type="url"
                  className="field-input"
                  placeholder="https://site.com/imagem.jpg"
                  value={
                    values.imagem.startsWith('data:')
                        ? ''
                        : values.imagem
                  }
                  onChange={handleFieldChange}
              />

              <p className="field-helper">
                Dica: Não tem um link? Transforme sua foto em URL usando o{' '}
                <a
                    href="https://pages.edgeone.ai/drop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
            text-[color:var(--color-primary)]
            hover:text-[color:var(--color-primary-hover)]
            underline
            transition-colors
          "
                >
                  EdgeOne Drop
                </a>.
              </p>
            </>
        ) : (
            <div className="space-y-3">
              {/* input real escondido */}
              <input
                  id="imagem-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
              />

              {/* botão separado */}
              <label
                  htmlFor="imagem-upload"
                  className="
          field-input
          flex
          justify-center
          items-center
          cursor-pointer
        "
              >
                Escolher arquivo
              </label>

              {/* nome/estado separado */}
              <p
                  className="
          text-center
          text-sm
          text-[color:var(--color-text-muted)]
        "
              >
                {values.imagem
                    ? ''
                    : 'Nenhum arquivo selecionado'}
              </p>
            </div>
        )}

        {values.imagem && (
            <img
                src={values.imagem}
                alt="Pré-visualização"
                className="
        mt-4
        h-40
        w-full
        rounded-lg
        object-cover
        border
        border-[color:var(--color-border)]
      "
            />
        )}

        {/* BOTÕES AGORA EMBAIXO E CENTRALIZADOS */}
        <div className="mt-4 flex justify-center gap-3">
          <Button
              type="button"
              className={
                imageMode === 'url'
                    ? 'btn-primary hover:cursor-pointer'
                    : 'btn-secondary hover:cursor-pointer'
              }
              onClick={() => changeImageMode('url')}
          >
            URL
          </Button>

          <Button
              type="button"
              className={
                imageMode === 'upload'
                    ? 'btn-primary hover:cursor-pointer'
                    : 'btn-secondary hover:cursor-pointer'
              }
              onClick={() => changeImageMode('upload')}
          >
            Upload
          </Button>
        </div>

        {errors.imagem && (
            <p className="field-error">
              {errors.imagem}
            </p>
        )}
      </div>

      <div>
        <label htmlFor="categoria" className="field-label">
          Categoria
        </label>
        <input
          id="categoria"
          name="categoria"
          type="text"
          className="field-input"
          placeholder="Ex.: Periféricos"
          value={values.categoria}
          onChange={handleFieldChange}
        />
        {errors.categoria && <p className="field-error">{errors.categoria}</p>}
      </div>

      <Button
          type="submit"
          className="btn-primary w-full sm:w-fit sm:block sm:mx-auto"
          disabled={isSubmitting}
      >
        {isSubmitting ? 'Salvando produto...' : 'Cadastrar produto'}
      </Button>
    </form>
  )
}

export default ProductForm
