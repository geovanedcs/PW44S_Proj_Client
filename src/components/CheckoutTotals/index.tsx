import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import {Button} from "@mui/material";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

interface CheckoutTotalsProps {
    total: number;
    discount: number;
}

export function CheckoutTotals(prop: CheckoutTotalsProps) {
    return (
        <>
            <Card variant="outlined" sx={{margin: 5}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Total do carrinho
                    </Typography>
                    <Typography variant="body2">
                        Total em produtos: {prop.total}
                    </Typography>
                    <Typography variant="body2">
                        Desconto: {prop.discount}
                    </Typography>
                </CardContent>
                <CardActions sx={{textAlign: "center"}}>
                    <Button>
                        <ShoppingCartCheckoutIcon></ShoppingCartCheckoutIcon>
                        <Typography>CheckOut</Typography>
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}