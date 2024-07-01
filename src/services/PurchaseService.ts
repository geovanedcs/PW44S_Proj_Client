import {api} from "@/libs/axios.ts";
import {IPurchase} from "@/commons/interfaces.ts";

const URL = '/purchase';


const save = async (purchase: IPurchase) => {
    let response;
    try {
        response = await api.post(URL, purchase);
    } catch (error: any) {
        response = error.response;
    }
    return response;
}

const findAll = async () => {
    let response;
    try {
        response = await api.get(URL);
    } catch (error: any) {
        response = error.response;
    }
    return response;
}

const findById = async (id: number) => {
    let response;
    try {
        response = await api.get(`${URL}/${id}`);
    } catch (error: any) {
        response = error.response;
    }
    return response;
}

const remove = async (id: number) => {
    let response;
    try {
        response = await api.delete(`${URL}/${id}`);
    } catch (error: any) {
        response = error.response;
    }
    return response;
}


export const PurchaseService = {
    save,
    findAll,
    findById,
    remove,
};