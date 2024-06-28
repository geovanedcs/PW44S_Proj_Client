import {ChangeEvent, useState} from "react";
import {useCheckoutContext} from "@/Context/CheckoutContext.tsx";
import {FilledInput, FormControl, FormGroup, InputAdornment, InputLabel} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

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
    const {setZipCode, setAddressWithUnitNumber} = useCheckoutContext();
    // const [pendingApiCall, setPendingApiCall] = useState(false);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const onClickBuscaCep = async () => {
        const response = await axios.get(`https://viacep.com.br/ws/${form.zipCode}/json/`);
        if (response.status === 200) {
            setForm({
                ...form,
                address: response.data.logradouro + ' - ' + response.data.bairro + ' - ' + response.data.localidade + ' / ' + response.data.uf,
            });
        }
        setZipCode(form.zipCode.toString());
        setAddressWithUnitNumber(form.address);
    }


    return (
        <>
            <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                <FormGroup>
                    <FormControl fullWidth sx={{m: 1}} variant="filled">
                        <InputLabel htmlFor="filled-adornment-cep">CEP</InputLabel>
                        <FilledInput id="filled-adornment-cep"
                                     name="zipCode"
                                     onChange={onChange}
                                     endAdornment={<InputAdornment position="end">
                                         <IconButton onClick={onClickBuscaCep}
                                                     aria-label="Buscar CEP">
                                             <SearchIcon/>
                                         </IconButton>
                                     </InputAdornment>}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="filled-endereco">Endereço</InputLabel>
                        <FilledInput id="filled-endereco"
                                     name="address"
                                     value={form.address}
                                     onChange={onChange}/>
                    </FormControl>
                </FormGroup>
            </Box>
        </>
    );
}