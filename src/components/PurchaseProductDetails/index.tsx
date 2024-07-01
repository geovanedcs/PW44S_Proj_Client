import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {formatCurrency} from "@/commons/formatCurrency.ts";
import Card from "@mui/material/Card";
import { IPurchaseItems} from "@/commons/interfaces.ts";

interface props {
    index: number;
    item: IPurchaseItems;
}

export function PurchaseProductDetails(props: props){

    return(
        <>
            <Card key={props.index} sx={{display: 'flex', justifyContent:'space-between'}}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardMedia
                        sx={{height: 140, width: 140, margin: "auto"}}
                        component="img"
                        height="140"
                        image={props.item.product.image}
                        alt={props.item.product.name}/>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <CardContent sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography gutterBottom variant="h5" component="div" sx={{alignItems:'end'}}>
                            {props.item.product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{textAlign:'end'}}>
                            Preço: {formatCurrency(props.item.product.price)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{textAlign:'end'}}>
                            Quantidade: {props.item.quantity}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </>
    );
}