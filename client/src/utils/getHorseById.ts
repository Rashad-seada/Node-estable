import { horsesRoute } from "@/constants/api";
import { httpGetServices } from "@/services/httpGetService";

 
export async function getHorseById(horseId:string) {
    const horse = await httpGetServices(`${horsesRoute}/${horseId}`);
    return horse.data
}

