import {ChangeEvent, useState} from "react";
import {useCheckoutContext} from "@/Context/CheckoutContext.tsx";
import {FilledInput, FormControl, FormGroup, InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface IAddress {
    zipCode: number,
    address: string,
    number?: number,
}

interface CheckOutAddressProps {
    disable?: boolean
}

export function CheckOutAddress({disable}: CheckOutAddressProps) {

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
                address: response.data.logradouro + ' , ' + response.data.bairro + ' , ' + response.data.localidade + ' , ' + response.data.uf,
            });
        }
        setZipCode(form.zipCode);
        setAddressWithUnitNumber(response.data.logradouro + ' , ' + response.data.bairro + ' , ' + response.data.localidade + ' , ' + response.data.uf);
    }

    return (
        <>
            <Box sx={{display: !disable ? 'block' : 'none'}}>
                <Card sx={{height: '70vh', display: 'flex', justifyContent: 'center'}}>
                    <CardContent>
                        <FormGroup sx={{width: 500}}>
                            <FormControl fullWidth sx={{m: 1}} variant="filled">
                                <Typography variant="body2">CEP</Typography>
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
                            <FormControl fullWidth sx={{m: 1}}>
                                <Typography variant="body2">Endereço</Typography>
                                <TextField id="filled-endereco"
                                           name="address"
                                           multiline
                                           value={form.address}
                                           onChange={onChange}/>
                            </FormControl>
                        </FormGroup>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}