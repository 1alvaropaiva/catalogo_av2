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