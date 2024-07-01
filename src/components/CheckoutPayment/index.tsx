import {useEffect, useState} from "react";
import qrcode from "@/assets/QR_code.png";
import {useCheckoutContext} from "@/Context/CheckoutContext.tsx";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Button, Divider, FormControl, FormGroup, Input, MenuItem, Select} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

interface ICards {
    cardNumber?: number,
    cardName?: string,
    cardExpiration?: string,
    cardCVV?: number,
    cardMethod?: string,
}

interface ICheckoutPaymentProps {
    name: string;
    method: string;
}

interface CheckoutPaymentProps {
    disable?: boolean
}

export function CheckoutPayment({disable}: CheckoutPaymentProps) {

    const [cardForm, setCardForm] = useState<ICards>();

    const menuMethods: ICheckoutPaymentProps[] = [
        {name: "Selecione a forma de pagamento", method: "Selecione a forma de pagamento"},
        {name: "Débito", method: "DEBIT_CARD"},
        {name: "Crédito", method: "CREDIT_CARD"},
        {name: "Boleto Bancário", method: "BRAZILIAN_BANK_SLIP"},
        {name: "PIX", method: "PIX"},
        {name: "Outros", method: "OTHER"}
    ]

    const [selectedPayment, setSelectedPayment] = useState<ICheckoutPaymentProps>(menuMethods[0]);
    const [showQRCode, setShowQRCode] = useState<boolean>(false);
    const [showCard, setShowCard] = useState<boolean>(false);
    const [showOther, setShowOther] = useState<boolean>(false);

    const {setPaymentMethod, getPaymentMethod} = useCheckoutContext();
    useEffect(() => {
        showCardForm();
    }, [selectedPayment]);

    const onChangeMethod = (event: any) => {
        const value = event.target;
        const tmp = menuMethods.find((method) => method.method === value.value);
        setSelectedPayment({
            name: tmp?.name || "",
            method: tmp?.method || ""
        });
        setPaymentMethod(tmp?.method || "");
    }

    const onChange = (event: any) => {
        const {name, value} = event.target;
        setCardForm({
            ...cardForm,
            [name]: value
        });
        setPaymentMethod(selectedPayment.method);
    }

    const onClickQrCode = () => {
        setShowQRCode(true);
    }

    const showCardForm = () => {
        const pay = selectedPayment.method;
        if (pay === "DEBIT_CARD" || pay === "CREDIT_CARD") {
            setShowCard(true);
            setShowOther(false);
        } else if (pay === "PIX" || pay === "BRAZILIAN_BANK_SLIP") {
            setShowOther(true);
            setShowCard(false);
        }
        setPaymentMethod(selectedPayment.method);
        console.log(getPaymentMethod());
    }

    return (
        <>
            <FormGroup sx={{display: !disable ? 'block': 'none'}}>
                <FormControl fullWidth>
                    <Card sx={{height: '70vh', display: 'flex', justifyContent: 'center'}}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Selecione a forma de pagamento
                            </Typography>
                            <Select sx={{width: 500}} name="method" value={selectedPayment.method}
                                    onChange={onChangeMethod}>
                                {menuMethods.map((method, index) => {
                                    return <MenuItem sx={{textAlign: 'center'}} key={index}
                                                     value={method.method}>{method.name}</MenuItem>
                                })}
                            </Select>
                            <Divider sx={{padding: 1}}/>
                            <Card sx={{width: 500, display: showCard ? 'block' : 'none'}}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        Informe os dados do cartão de {selectedPayment.name.toLowerCase()}
                                    </Typography>
                                    <FormGroup>
                                        <FormControl sx={{m: 1}} variant="filled">
                                            <Typography variant="body2">Número do cartão</Typography>
                                            <Input type="number" name="cardNumber" onChange={onChange}
                                                   value={cardForm?.cardNumber}/>
                                        </FormControl>
                                        <FormControl sx={{m: 1}} variant="filled">
                                            <Typography variant="body2">Nome do titular</Typography>
                                            <Input type="text" name="cardName" onChange={onChange}
                                                   value={cardForm?.cardName}/>
                                        </FormControl>
                                        <div>
                                            <FormControl sx={{m: 1, width: '45%'}} variant="filled">
                                                <Typography variant="body2">Validade</Typography>
                                                <Input type="text" name="cardExpiration" onChange={onChange}
                                                       value={cardForm?.cardExpiration}/>
                                            </FormControl>
                                            <FormControl sx={{m: 1, width: '45%'}} variant="filled">
                                                <Typography variant="body2">CVV</Typography>
                                                <Input type="number" name="cardCVV" onChange={onChange}
                                                       value={cardForm?.cardCVV}/>
                                            </FormControl>
                                        </div>
                                    </FormGroup>
                                </CardContent>
                            </Card>
                            <Divider sx={{padding: 1}}/>
                            <Card sx={{width: 500, padding: 1, display: showOther ? 'block' : 'none'}}>
                                <CardActions sx={{justifyContent: 'center'}}>
                                    <Button variant="contained" onClick={() => onClickQrCode()}>
                                        <Typography variant="subtitle1" component="div">
                                            Clique aqui para gerar o {selectedPayment.name}
                                        </Typography>
                                    </Button>
                                </CardActions>
                                <CardMedia
                                    sx={{
                                        height: 200,
                                        width: 200,
                                        margin: 'auto',
                                        display: showQRCode ? 'block' : 'none'
                                    }}
                                    image={qrcode}/>
                            </Card>
                        </CardContent>
                    </Card>
                </FormControl>
            </FormGroup>
        </>
    );
}