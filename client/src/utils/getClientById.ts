import { clientsRoute } from "@/constants/api";
import { httpGetServices } from "@/services/httpGetService";

export async function getClientById(clientId:string) {
    const client = await httpGetServices(`${clientsRoute}/${clientId}`);
    return client.data
}

