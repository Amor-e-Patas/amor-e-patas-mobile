
import axios, { authenticatedAPI } from "./services";
import { Imagem } from "./img_animal";
import { Sociavel } from "./sociavel";
import { Temperamento } from "./temperamento";
import { Vivencia } from "./vivencia";

export interface Animal {
    id_animal: number
    nome_ani: string,
    idade: string,
    cor: string,
    caracteristica_animal: string,
    data_nasc: string,
    desaparecido: string,
    id_usuario: number,
    id_porte: number,
    id_especie: number,
    id_sexo: number,
    id_status: number,
    images: Array<Imagem>,
    temperamentos: Array<Temperamento>,
    sociaveis: Array<Sociavel>,
    vivencias: Array<Vivencia>,
    nome_esp: string,
    tipo_sexo: string,
    cidade: string,
    estado: string,
    nome_usu: string,
    num_telefone: string,
}

export async function criarAnimal(nome_ani: string,
    idade: string,
    cor: string,
    caracteristica_animal: string,
    data_nasc: string,
    desaparecido: string,
    id_usuario: number,
    id_porte: number,
    id_especie: number,
    id_sexo: number,
    id_status: number,
    temperamentos: Array<Number>,
    sociaveis: Array<Number>,
    vivencias: Array<Number>,) {

    try {

        const res = await authenticatedAPI.post<Animal>("/animal", {
            nome_ani,
            idade,
            cor,
            caracteristica_animal,
            data_nasc,
            desaparecido,
            id_usuario,
            id_porte,
            id_especie,
            id_sexo,
            id_status,
            temperamentos,
            sociaveis,
            vivencias
        })
        return res.data.id_animal;
    } catch (error) {
        throw error;
    }
}

export async function getAnimais() {
    try {
        const response = await authenticatedAPI.get<Array<Animal>>(`/animaisaprovados`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getAnimaisApro() {
    try {
        const response = await authenticatedAPI.get<Array<Animal>>(`/aniaprovnormais`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getAnimaisEmAnalise() {
    try {
        const response = await authenticatedAPI.get<Array<Animal>>(`/animaisanalise`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getAnimaisDesaparecidos() {
    try {
        const response = await authenticatedAPI.get<Array<Animal>>(`/animaisdesaparecidos`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getAnimaisDesaparecidosAnalise() {
    try {
        const response = await authenticatedAPI.get<Array<Animal>>(`/anianalisedesaparecidos`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getAnimaisDesaparecidosAnalise2() {
    try {
        const response = await authenticatedAPI.get<Array<Animal>>(`/anianalisedesaparecidos2`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getAnimaisDesaparecidosReprovados() {
    try {
        const response = await authenticatedAPI.get<Array<Animal>>(`/animalreprovdesa`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getAnimaisDesaparecidosAll() {
    try {
        const response = await authenticatedAPI.get<Array<Animal>>(`/anisaprovdesaparecidos`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getAnimal(id_animal: number) {
    try {
        const response = await authenticatedAPI.get<Animal>(`/animal/${id_animal}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getAnimalIndex(id_animal: number) {
    try {
        const response = await authenticatedAPI.get<Animal>(`/animalindex/${id_animal}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getAnimaisNegados() {
    try {
        const response = await authenticatedAPI.get<Array<Animal>>(`/animaisnegados`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getAnimaisAnalises() {
    try {
        const response = await authenticatedAPI.get(`/animaisanalise`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function deleteAnimal(id_animal: number) {
    try {
        const response = await authenticatedAPI.delete(`/animal/${id_animal}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function alterarStatus(id_animal: number, id_status: number) {
    try {
        const response = await authenticatedAPI.put(`/animal/status/${id_animal}`, { id_status });
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function alterarAnimal(
    nome_ani: string,
    id_animal: number,
    idade: string,
    cor: string,
    caracteristica_animal: string,
    data_nasc: string,
    desaparecido: string,
    id_usuario: number,
    id_porte: number,
    id_especie: number,
    id_sexo: number,
    selectTemps: Array<number>,
    selectSocis: Array<number>,
    selectVives: Array<number>,
    imagesToRemove: Array<number>
) {
    try {
        await authenticatedAPI.put(`/animal/${id_animal}`, {
            nome_ani,
            idade,
            cor,
            caracteristica_animal,
            data_nasc,
            desaparecido,
            id_usuario,
            id_porte,
            id_especie,
            id_sexo,
            selectTemps,
            selectSocis,
            selectVives,
            imagesToRemove
        });
        return
    } catch (err) {
        throw err;
    }
}

export async function getAniTemperamentos() {
    try {
        const response = await authenticatedAPI.get(`/anitemps/11`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getAnimaisEmAnalise2() {
    try {
        const response = await authenticatedAPI.get<Array<Animal>>(`/animaisanalise2`);
        return response.data;
    } catch (err) {
        throw err;
    }
}