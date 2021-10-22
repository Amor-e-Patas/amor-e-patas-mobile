import { authenticatedAPI } from "./services";

export async function getTemperamento() {
    try {
        const response = await authenticatedAPI.get(`/temperamentos`);
        return response.data;
    } catch (err) {
        throw err;
    }
}