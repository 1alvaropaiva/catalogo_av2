/**
 * Arquivo: image.mapper.ts
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
export async function imageFileToBase64(
    file: File,
): Promise<string> {

    return new Promise(
        (
            resolve,
            reject,
        ) => {

            const reader =
                new FileReader()

            reader.onload =
                () =>
                    resolve(
                        reader.result as string,
                    )

            reader.onerror =
                () =>
                    reject(
                        new Error(
                            'Erro ao converter imagem.',
                        ),
                    )

            reader.readAsDataURL(
                file,
            )
        },
    )
}