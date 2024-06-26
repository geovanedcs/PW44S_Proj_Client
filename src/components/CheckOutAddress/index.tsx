import {ChangeEvent, useState} from "react";
import axios from "axios";
import {PurchaseService} from "@/services/PurchaseService.ts";
import {IPurchase} from "@/commons/interfaces.ts";

interface IAddress {
    zipCode: number,
    address: string,
    number?: number,
}

export function CheckOutAddress() {

    const [form, setForm] = useState<IAddress>({
        zipCode: 0,
        address: '',
        number: 0,
    });
    const [pendingApiCall, setPendingApiCall] = useState(false);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const onClickLoadAddress = async (cep: number) =>{
        setPendingApiCall(true)
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if(response.status === 200){
            setForm({
                zipCode: response.data.cep,
                address: response.data.logradouro,
            });
        }

    }

    const onSubmit = async () => {
        setPendingApiCall(true)
        const preShop:IPurchase = await PurchaseService.getPrePurchase();
        preShop.zipCode = String(form.zipCode);
        preShop.addressWithUnitNumber = `${form.address}, ${form.number}`;
        await PurchaseService.preSavePurchase(preShop);

    };

    return (
        <>

        </>
    );
}