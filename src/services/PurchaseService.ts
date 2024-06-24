import {api} from "@/libs/axios.ts";
import {IProduct} from "@/commons/interfaces.ts";

const URL = '/purchase';

const retrieveCart = async () => {
    let response;
    try {
        response = await JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (error: any) {
        response = error.response;
    }
    return response;
}

const addToCart = async (product: IProduct) => {
    let response;
    try {
        const cart = await retrieveCart();
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        response = cart;
    } catch (error: any) {
        response = error.response;
    }
    return response;
}

const removeFromCart = async (index: number) => {
    let response;
    try {
        const cart = await retrieveCart();
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        response = cart;
    } catch (error: any) {
        response = error.response;
    }
    return response;
}

const save = async (purchase: any) => {
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
    retrieveCart,
    addToCart,
    removeFromCart,
    save,
    findAll,
    findById,
    remove,
};