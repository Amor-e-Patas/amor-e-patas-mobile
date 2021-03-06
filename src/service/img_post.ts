
import axios, { authenticatedAPI } from "./services";
interface Imagem{
    uri: string,
    height: number,
    type: string
}

export async function criarImgPost(
    imagens: Array<Imagem>,
    id_post: string) {
    try {
        const data = new FormData();
        data.append('id_post', id_post);
        imagens.forEach(image => {
            data.append('image', { 
                // @ts-ignore
                uri: image.uri,
                name: `${image.height}.${image.uri.substr(image.uri.lastIndexOf('.') + 1)}`,
                type: `${image.type}/${image.uri.substr(image.uri.lastIndexOf('.') + 1)}`,
              })
          });
        await authenticatedAPI.post("/imagem", data);
} catch (error) {
    throw error;
}
}


export async function getImgPost() {
    try {
        const response = await authenticatedAPI.get<Imagem>(`/imagens`);
        return response.data;
    } catch (err) {
        throw err;
    }
}


export async function alterarPost(id_post: number,
    titulo: string,
    corpo: string,
    autor: string,
    data: string,
    assuntos: Array<Number>) {
    try {
        const response = await authenticatedAPI.put("/post", {
            titulo,
            corpo,
            autor,
            data,
            assuntos
        });
        return
    } catch (err) {
        throw err;
    }
}