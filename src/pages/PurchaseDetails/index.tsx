import {useNavigate, useParams} from "react-router-dom";
import {IPurchase,} from "@/commons/interfaces.ts";
import {useEffect, useState} from "react";
import {PurchaseService} from "@/services/PurchaseService.ts";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import {formatCurrency} from "@/commons/formatCurrency.ts";
import {Breadcrumbs, Button, Grid, Stack} from "@mui/material";
import {PurchaseProductDetails} from "@/components/PurchaseProductDetails";

export function PurchaseDetails() {

    const [purchase, setPurchase] = useState<IPurchase>();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadPurchase();
    }, []);

    const methods= [
        {name: "Cartão de débito", method: "DEBIT_CARD"},
        {name: "Cartão de crédito", method: "CREDIT_CARD"},
        {name: "Boleto Bancário", method: "BRAZILIAN_BANK_SLIP"},
        {name: "PIX", method: "PIX"},
        {name: "Outros", method: "OTHER"}
    ]

    const loadPurchase = async () => {
        const response = await PurchaseService.findById(parseInt(id as string));
        if (response.status === 200) {
            setPurchase(response.data);
            console.log(response.data)
        } else {
            navigate("/404");
        }
    }
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }


    return (
        <>
            <Breadcrumbs separator=">" aria-label="breadcrumb" sx={{paddingBottom:5}}>
                <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
                <Button color="inherit" onClick={() => navigate("/purchases")}>Compras</Button>
                <Button color="inherit" disabled={true}>Pedido {id}</Button>
            </Breadcrumbs>
            <Typography variant="h4" component="div" sx={{paddingBottom: 5}}> Detalhamento pedido: {id}</Typography>
            <Grid container spacing={2} justifyContent="space-evenly" alignItems="center">
                <Stack spacing={2} sx={{height: "80vh"}}>
                    <Typography variant="h5" component="h2">Produtos</Typography>
                    {purchase && (purchase.purchasedItems?.map((item, index) => (
                        <PurchaseProductDetails key={index} index={index} item={item}/>
                    )))}
                </Stack>
                <Grid item xs={6} md={4}>
                    <Typography variant="h5" component="h2">Detalhes da compra</Typography>
                    <Card>
                        <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'start'}}>
                                <Typography variant="body2" color="text.secondary">
                                    Data da compra:
                                </Typography>
                                <Typography variant="h6">
                                    {formatDate(purchase?.purchaseDate as string)}
                                </Typography>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'start'}}>
                                <Typography variant="body2" color="text.secondary" sx={{textAlign:'start'}}>
                                    Endereço:
                                </Typography>
                                <Typography variant="h6" sx={{textAlign:'end'}}>
                                {purchase?.addressWithUnitNumber}
                                </Typography>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'start'}}>
                                <Typography variant="body2" color="text.secondary">
                                    Forma de pagamento:
                                </Typography>
                                <Typography variant="h6">
                                {methods.find((method) => method.method === purchase?.paymentMethod)?.name}
                                </Typography>
                            </div>
                            <Typography variant="h5" component="h2"
                                        sx={{display: 'flex', justifyContent: 'end', textAlign: 'end', padding: 1}}>
                                Total: {formatCurrency(purchase?.total as number)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}