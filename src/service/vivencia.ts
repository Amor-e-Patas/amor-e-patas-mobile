import { authenticatedAPI } from "./services";

export async function getVivencia() {
    try {
        const response = await authenticatedAPI.get(`/vivencias`);
        return response.data;
    } catch (err) {
        throw err;
    }
}