
import axios, { authenticatedAPI } from "./services";
interface Assunto{
    id_assunto: number;
    nome_ass: string;
}

interface Imagem{
    uri: string,
    height: number,
    type: string
}

export async function criarPost(titulo: string,
    corpo: string,
    autor: string,
    data: string,
    assuntos: Array<Number>
    ) {
    try {
        const res = await authenticatedAPI.post<any>("/post", {
            titulo,
            corpo,
            autor,
            data,
            assuntos
        })
        return res.data.id_post;
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
        const response = await authenticatedAPI.get<Assunto[]>(`/assuntos`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getAssunto( id_post: number) {
    try {
        const response = await authenticatedAPI.get<Assunto>(`/assuntos/${id_post}`);
        return response.data;
    } catch (err) {
        throw err;
    }
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
        await authenticatedAPI.post("/imagempost", data);
    } catch (error) {
        throw error;
    }
}