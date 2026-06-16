import Button from "../../ui/Button.tsx";

interface ConfirmDeleteModalProps {
    productName: string
    isDeleting: boolean
    onCancel: () => void
    onConfirm: () => void
}

function ConfirmDeleteModal({
                                productName,
                                isDeleting,
                                onCancel,
                                onConfirm,
                            }: ConfirmDeleteModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="surface-card w-full max-w-md p-6">

                <h2 className="text-xl font-bold">
                    Excluir produto
                </h2>

                <p className="mt-3">
                    Deseja excluir <strong>{productName}</strong>?
                </p>

                <div className="mt-6 flex justify-end gap-3">

                    <Button
                        className="btn-secondary"
                        onClick={onCancel}
                    >
                        Cancelar
                    </Button>

                    <Button
                        className="btn-danger"
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting
                            ? 'Excluindo...'
                            : 'Excluir'}
                    </Button>

                </div>

            </div>

        </div>
    )
}

export default ConfirmDeleteModal