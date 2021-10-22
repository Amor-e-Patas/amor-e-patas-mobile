
import axios, { authenticatedAPI } from "./services";
export async function criarImgPost(
    imagens: Array<File>,
    id_post: string) {
    try {
        const data = new FormData();
        data.append('id_post', id_post);
        imagens.forEach(image => {
            data.append('image', image);
          });
        await authenticatedAPI.post("/imagem", data);
} catch (error) {
    throw error;
}
}


export async function getImgPost() {
    try {
        const response = await authenticatedAPI.get(`/imagens`);
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