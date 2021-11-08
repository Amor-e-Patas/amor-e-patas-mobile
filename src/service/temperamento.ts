import { authenticatedAPI } from "./services";

export interface Temperamento{
    id_temperamento: number,
    descricao: string,
}

export async function getTemperamento() {
    try {
        const response = await authenticatedAPI.get<Array<Temperamento>>(`/temperamentos`);
        return response.data;
    } catch (err) {
        throw err;
    }
}