import {api} from "@/libs/axios.ts";
import {IProduct} from "@/commons/interfaces.ts";

const URL = '/products';

const save = async (product: IProduct) => {
    let response;
    try {
        response = await api.post(URL, product);
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

const remove = async (id: number) => {
    let response;
    try {
        response = await api.delete(`${URL}/${id}`);
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

const ProductService = {
    save,
    findAll,
    remove,
    findById,
};

export default ProductService;