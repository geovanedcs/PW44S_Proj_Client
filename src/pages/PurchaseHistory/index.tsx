import {IPurchase} from "@/commons/interfaces.ts";
import {useEffect, useState} from "react";
import {PurchaseService} from "@/services/PurchaseService.ts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {formatCurrency} from "@/commons/formatCurrency.ts";
import CardActions from "@mui/material/CardActions";
import {Breadcrumbs, Button, Divider} from "@mui/material";
import {useNavigate} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";

export function PurchaseHistory() {

    const [purchaseHistory, setPurchaseHistory] = useState<IPurchase[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadPurchases();
    }, []);

    const loadPurchases = async () => {
        const response = await PurchaseService.findAll();
        if (response.status === 200) {
            setPurchaseHistory(response.data);
        }
    }
    const methods = [
        {name: "Cartão de débito", method: "DEBIT_CARD"},
        {name: "Cartão de crédito", method: "CREDIT_CARD"},
        {name: "Boleto Bancário", method: "BRAZILIAN_BANK_SLIP"},
        {name: "PIX", method: "PIX"},
        {name: "Outros", method: "OTHER"}
    ]

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    const onClickDetails = (id: number) => {
        navigate(`/purchases/${id}`);
    }

    return (
        <>
            <Breadcrumbs separator=">" aria-label="breadcrumb" sx={{paddingBottom:5}}>
                <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
                <Button color="inherit" disabled={true}>Compras</Button>
            </Breadcrumbs>
            <Card sx={{maxWidth: '60%', display: 'flex', flexDirection: 'column', margin: 'auto'}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Histórico de Compras
                    </Typography>
                </CardContent>
                <CardContent>
                    {purchaseHistory.map((purchase, index) =>
                        <Card key={index}>
                            <Typography variant="h5" component="div" color="text.primary" sx={{padding: 1}}>Pedido {index+1}</Typography>
                            <Divider sx={{paddingBottom: 1}}/>
                            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <CardContent
                                    sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width:'35vw'}}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Data da compra:
                                        </Typography>
                                        <Typography variant="h6">
                                            {formatDate(purchase?.purchaseDate as string)}
                                        </Typography>
                                    </div>
                                    <Divider/>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Forma de pagamento:
                                        </Typography>
                                        <Typography variant="h6">
                                            {methods.find((method) => method.method === purchase?.paymentMethod)?.name}
                                        </Typography>
                                    </div>
                                </CardContent>
                                <Divider orientation="vertical" flexItem />
                                <Box>
                                    <CardContent>
                                        <Typography variant="h5" component="h2" color="text.secondary"
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'end',
                                                        textAlign: 'end',
                                                        padding: 1
                                                    }}>
                                            Total: {formatCurrency(purchase?.total as number)}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{display: 'flex', justifyContent: 'end'}}>
                                        <Button variant="contained" onClick={() => onClickDetails(index + 1)}>
                                            <AddIcon/>Ver Detalhes
                                        </Button>
                                    </CardActions>
                                </Box>
                            </Box>
                        </Card>
                    )}
                </CardContent>
            </Card>
        </>
    );
}