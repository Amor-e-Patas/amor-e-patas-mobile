
import axios, { authenticatedAPI } from "./services";
export async function criarComentario(
    texto: string,
    data: string,
    id_usuario: number,
    id_post: number) {
    try {
        const res = await authenticatedAPI.post("/comentario", {
            texto,
            data,
            id_usuario,
            id_post
        })
        return res.data;
} catch (error) {
    throw error;
}
}


export async function getComentarios(id_comentario: number) {
    try {
        const response = await authenticatedAPI.get(`/comentarios/${id_comentario}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getComentario(id_comentario: number) {
    try {
        const response = await authenticatedAPI.get(`/comentario/${id_comentario}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function deleteComentario(id_comentario:number) {
    try {
        const response = await authenticatedAPI.delete(`/comentario/${id_comentario}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}
