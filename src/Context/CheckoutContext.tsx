import {ICartItem, IPurchase} from "@/commons/interfaces.ts";
import {createContext, ReactNode, useContext, useState} from "react";

type CheckoutProviderProps = {
    children: ReactNode
}

type CheckoutContextType = {
    getZipCode: () => number;
    getAddressWithUnitNumber: () => string;
    getPaymentMethod: () => string;
    setZipCode: (zipCode: number) => void;
    setAddressWithUnitNumber: (addressWithUnitNumber: string) => void;
    setPaymentMethod: (paymentMethod: string) => void;
    addProducts: (cart: ICartItem[]) => void;
    getPurchase: () => IPurchase;
}

const CheckoutContext = createContext({} as CheckoutContextType);

export function useCheckoutContext() {
    return useContext(CheckoutContext);
}

export function CheckoutProvider({children}: CheckoutProviderProps) {
    const [purchase, setPurchase] = useState<IPurchase>({
        zipCode: 0,
        items: [],
        paymentMethod: "",
    });

    function getZipCode() {
        return purchase?.zipCode || 0;
    }

    function getAddressWithUnitNumber() {
        return purchase?.addressWithUnitNumber || "";
    }

    function getPaymentMethod() {
        return purchase?.paymentMethod || "";
    }

    function setZipCode(zipCode: number) {
        setPurchase(curr => {
            return {...curr, zipCode: zipCode};
        });
    }

    function setAddressWithUnitNumber(addressWithUnitNumber: string) {
        setPurchase(curr => {
            return {...curr, addressWithUnitNumber: addressWithUnitNumber};
        });
    }

    function setPaymentMethod(paymentMethod: string) {
        setPurchase(curr => {
            return {...curr, paymentMethod: paymentMethod};
        });
    }

    function addProducts(items: ICartItem[]) {
        setPurchase(curr => {
            return {...curr, items: items};
        });
    }

    function getPurchase() {
        return purchase;
    }

    return (
        <CheckoutContext.Provider value={{
            getZipCode,
            setZipCode,
            getAddressWithUnitNumber,
            setAddressWithUnitNumber,
            getPaymentMethod,
            setPaymentMethod,
            addProducts,
            getPurchase,
        }}>
            {children}
        </CheckoutContext.Provider>
    )
}