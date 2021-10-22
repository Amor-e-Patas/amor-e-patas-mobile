import { authenticatedAPI } from "./services";

export async function getSociavel() {
    try {
        const response = await authenticatedAPI.get(`/sociaveis`);
        return response.data;
    } catch (err) {
        throw err;
    }
}