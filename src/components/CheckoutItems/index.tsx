import Card from "@mui/material/Card";
import {Button, ButtonGroup} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import {IProduct} from "@/commons/interfaces.ts";
import {useEffect, useState} from "react";
import {PurchaseService} from "@/services/PurchaseService.ts";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import InfoIcon from '@mui/icons-material/Info';

interface props {
    prod: IProduct;
}

export function ProductCard(prod: props) {

    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        getQuantity();
    }, []);

    const getQuantity = async () => {
        const response = await PurchaseService.retrieveCart();
        setQuantity(response.filter((product: IProduct) => product.id === prod.prod.id).length);
    }

    return (
        <>
            <Card sx={{display: 'flex'}}>
                <Box key={prod.prod.id} sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardMedia
                        component="img"
                        sx={{width: 150}}
                        image={prod.prod.image}
                        alt={prod.prod.name}/>
                </Box>
                <Box sx={{paddingRight: 30}}/>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardContent sx={{flex: '1 0 auto'}}>
                        <Typography component="div" variant="h5">
                            {prod.prod.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            R$ {prod.prod.price.toFixed(2)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <div>
                            <ButtonGroup>
                                <Button
                                    aria-label="reduce"
                                    onClick={() => {
                                        setQuantity(Math.max(quantity - 1, 0));
                                    }}
                                >
                                    <RemoveIcon fontSize="small"/>
                                </Button>
                                <Button>
                                    {quantity}
                                </Button>
                                <Button
                                    aria-label="increase"
                                    onClick={() => {
                                        setQuantity(quantity + 1);
                                    }}
                                >
                                    <AddIcon fontSize="small"/>
                                </Button>
                            </ButtonGroup>
                        </div>
                        <div>
                            <Button variant="contained">
                                <InfoIcon/>
                                Mais detalhes
                            </Button>
                        </div>
                    </CardActions>
                </Box>
            </Card>
        </>
    );
}