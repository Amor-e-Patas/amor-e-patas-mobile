
import axios, { authenticatedAPI } from "./services";
export async function criarPost(titulo: string,
    corpo: string,
    autor: string,
    data: string,
    assuntos: Array<Number>) {
    try {
        const res = await authenticatedAPI.post("/post", {
            titulo,
            corpo,
            autor,
            data,
            assuntos
        })
        return res.data;
    } catch (error) {
        throw error;
    }
}


export async function getPosts() {
    try {
        const response = await authenticatedAPI.get(`/postsall`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getPost(id_post: number) {
    try {
        const response = await authenticatedAPI.get(`/post/${id_post}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function deletePost(id_post: number) {
    try {
        const response = await authenticatedAPI.delete(`/post/${id_post}`);
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
        const response = await authenticatedAPI.put(`/post/${id_post}`, {
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

export async function getAssuntos() {
    try {
        const response = await authenticatedAPI.get(`/assuntos`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getAssunto( id_post: number) {
    try {
        const response = await authenticatedAPI.get(`/assuntos/${id_post}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function criarImgPost(
    imagens: Array<File>,
    id_post: string) {
    try {
        const data = new FormData();
        data.append('id_post', id_post);
        imagens.forEach(image => {
            data.append('image', image);
        });
        await authenticatedAPI.post("/imagempost", data);
    } catch (error) {
        throw error;
    }
}