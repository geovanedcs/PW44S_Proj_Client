export interface IUserSignUp {
    displayName: string;
    username: string;
    password: string;
}

export interface IUserLogin {
    username: string;
    password: string;
}

export interface ICategory {
    id?: number;
    name: string;
}

export interface IProduct {
    id?: number;
    name: string;
    description: string;
    image?: string;
    price: number;
    category: ICategory;
    stock: number;
}

export interface ICartItem {
    product: IProduct;
    quantity: number;
    discount?: number;
}

export interface IPurchase {
    paymentMethod: string;
    zipCode: string;
    address?: string;
    products: ICartItem[];
    status?: string;
}