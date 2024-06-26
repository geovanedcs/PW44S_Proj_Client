import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import {Button} from "@mui/material";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import {useNavigate} from "react-router-dom";
import {formatCurrency} from "@/commons/formatCurrency.ts";

interface CheckoutTotalsProps {
    total: number;
    discount: number;
}

export function CheckoutTotals(prop: CheckoutTotalsProps) {

    const navigate = useNavigate();
    return (
        <>
            <Card variant="outlined" sx={{margin: 5}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Total do carrinho
                    </Typography>
                    <Typography variant="body2">
                        Total em produtos: {formatCurrency(prop.total)}
                    </Typography>
                    <Typography variant="body2">
                        Desconto: {prop.discount}
                    </Typography>
                </CardContent>
                <CardActions sx={{textAlign: "center"}}>
                    <Button onClick={() => navigate("/checkout")}>
                        <ShoppingCartCheckoutIcon></ShoppingCartCheckoutIcon>
                        <Typography>CheckOut</Typography>
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}