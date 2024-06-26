import {createContext, ReactNode, useContext} from "react";
import {ICartItem, IProduct} from "@/commons/interfaces.ts";
import {useLocalStorage} from "@/services/useLocalStorage.ts";

type CartProviderProps = {
    children: ReactNode
}
type ShoppingCartContext = {
    getQuantity: (id: number) => number;
    addOne: (id: number) => void;
    removeOne: (id: number) => void;
    removeItem: (id: number) => void;
    cartQuantity: number;
    totalAmount:(products: IProduct[]) => number;
    cartItems: ICartItem[];
}

const CartContext = createContext({} as ShoppingCartContext);

export function useCartContext(){
    return useContext(CartContext);
}

export function CartProvider({children}: CartProviderProps){

    const [cartItems, setCartItems] = useLocalStorage<ICartItem[]>("items",[]);
    const cartQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity, 0);
    function getQuantity(id: number){
        return cartItems.find(item => item.productRequestDTO.id === id)?.quantity || 0;
    }
    function addOne(id: number){
        setCartItems(currItems => {
            if(currItems.find(item => item.productRequestDTO.id === id)==null){
                return [...currItems, {productRequestDTO: {id}, quantity: 1}];
            }else{
                return currItems.map(item => {
                    if(item.productRequestDTO.id === id){
                        return {...item, quantity: item.quantity + 1};
                }else {
                        return item;
                    }
                })
            }
        });
    }

    function removeOne(id: number){
        setCartItems(currItems => {
            if(currItems.find(item => item.productRequestDTO.id === id)?.quantity === 1){
                return currItems.filter(item => item.productRequestDTO.id !== id);
            }else{
                return currItems.map(item => {
                    if(item.productRequestDTO.id === id){
                        return {...item, quantity: item.quantity - 1};
                    }else {
                        return item;
                    }
                })
            }
        });
    }

    function removeItem(id: number){
        setCartItems(currItems => currItems.filter(item => item.productRequestDTO.id !== id));
    }

    function totalAmount(products: IProduct[]){
        let total = 0;
        for (const item of products) {
            if(cartItems.find(cartItem => cartItem.productRequestDTO.id === item.id)){
                total += item.price * getQuantity(item.id);
            }
        }
        return total;
    }

    return (
        <CartContext.Provider value={{
            getQuantity,
            addOne,
            removeOne,
            removeItem,
            cartQuantity,
            totalAmount,
            cartItems
        }}>
            {children}
        </CartContext.Provider>
    );
}