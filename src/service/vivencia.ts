import { authenticatedAPI } from "./services";

export interface Vivencia{
    id_vivencia: number,
    descricao: string,
}

export async function getVivencia() {
    try {
        const response = await authenticatedAPI.get<Array<Vivencia>>(`/vivencias`);
        return response.data;
    } catch (err) {
        throw err;
    }
}