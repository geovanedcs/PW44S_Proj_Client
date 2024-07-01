import {IPurchase} from "@/commons/interfaces.ts";
import {useEffect, useState} from "react";
import {PurchaseService} from "@/services/PurchaseService.ts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {formatCurrency} from "@/commons/formatCurrency.ts";
import CardActions from "@mui/material/CardActions";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

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
    const methods= [
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
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Histórico de Compras
                    </Typography>
                </CardContent>
                <CardContent>
                    {purchaseHistory.map((purchase,index) => (
                        <Card key={index}>
                            <CardContent>
                                <Typography>
                                    Data da compra: {formatDate(purchase.purchaseDate as string)}
                                </Typography>
                                <Typography>
                                    Forma de pagamento: {methods.find((method) => method.method === purchase.paymentMethod)?.name}
                                </Typography>
                                <Typography>
                                    Total: {formatCurrency(purchase.total as number)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={()=> onClickDetails(index)}>
                                    Ver Detalhes
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </>
    );
}