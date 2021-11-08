import { authenticatedAPI } from "./services";

export interface Sociavel{
    id_sociavel: number,
    descricao: string,
}

export async function getSociavel() {
    try {
        const response = await authenticatedAPI.get<Array<Sociavel>>(`/sociaveis`);
        return response.data;
    } catch (err) {
        throw err;
    }
}