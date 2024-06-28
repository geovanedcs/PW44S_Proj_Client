import {IPurchase} from "@/commons/interfaces.ts";
import {createContext, ReactNode, useContext, useState} from "react";

type CheckoutProviderProps = {
    children: ReactNode
}

type CheckoutContextType = {
    getZipCode: ()  => string;
    getAddressWithUnitNumber: () => string;
    getPaymentMethod: () => string;
    setZipCode: (zipCode: string) => void;
    setAddressWithUnitNumber: (addressWithUnitNumber: string) => void;
    setPaymentMethod: (paymentMethod: string) => void;
}

const CheckoutContext = createContext({} as CheckoutContextType);

export function useCheckoutContext(){
    return useContext(CheckoutContext);
}

export function CheckoutProvider({children}: CheckoutProviderProps){
    const [purchase, setPurchase] = useState<IPurchase>({
        zipCode: "",
        items: [],
        paymentMethod: "",
    });

    function getZipCode(){
        return purchase?.zipCode || "";
    }
    function getAddressWithUnitNumber(){
        return purchase?.addressWithUnitNumber || "";
    }
    function getPaymentMethod(){
        return purchase?.paymentMethod || "";
    }

    function setZipCode(zipCode: string) {
        setPurchase(curr => {
            return {...curr, zipCode: zipCode};
        });
    }

    function setAddressWithUnitNumber(addressWithUnitNumber: string){
        setPurchase(curr => {
            return {...curr, addressWithUnitNumber: addressWithUnitNumber};
        });
    }

    function setPaymentMethod(paymentMethod: string){
        setPurchase(curr => {
            return {...curr, paymentMethod: paymentMethod};
        });
    }
    return (
        <CheckoutContext.Provider value={{
            getZipCode,
            setZipCode,
            getAddressWithUnitNumber,
            setAddressWithUnitNumber,
            getPaymentMethod,
            setPaymentMethod
        }}>
            {children}
        </CheckoutContext.Provider>
    )
}