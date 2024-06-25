import {api} from "@/libs/axios.ts";
import {ICartItem} from "@/commons/interfaces.ts";

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


const addToCart = async (id: number) => {
    let response;
    try {
        const cart = await retrieveCart();
        const index = cart.findIndex((item: ICartItem) => id === item.product.id);
        if (index !== -1) {
            cart[index].quantity += 1;
        } else {
            const apiResponse = await api.get(`/products/${id}`);
            if (apiResponse.status === 200) {
                response = {
                    product: {
                        id: apiResponse.data.id,
                        name: apiResponse.data.name
                    },
                    quantity: 1
                }
            }
            cart.push(response);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
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

const valueBadge = async () => {
    const response = await retrieveCart();
    return response.length;
}

export const PurchaseService = {
    retrieveCart,
    addToCart,
    removeFromCart,
    save,
    findAll,
    findById,
    remove,
    valueBadge
};