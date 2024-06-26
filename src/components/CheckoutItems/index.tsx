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
import ProductService from "@/services/ProductService.ts";
import {useNavigate} from "react-router-dom";

interface props {
    id: number;
}

export function ProductCard({id}: props) {

    const [quantity, setQuantity] = useState(0);
    const [product, setProduct] = useState<IProduct>({} as IProduct);
    const [price, setPrice] = useState(0);
    useEffect( ()  => {
        getQuantity();
    }, []);

    const getQuantity = async () => {
        const response = await ProductService.findById(id);
        if(response.status === 200){
            setProduct(response.data);
            setPrice(response.data.price.toFixed(2));
        }
        const cart = await PurchaseService.retrieveCart();
        setQuantity(cart.find((item: any) => item.product.id === id)?.quantity || 0);
    }
    const navigate = useNavigate();

    return (
        <>
            <Card sx={{display: 'flex', marginBottom: 2}}>
                <Box key={product.id} sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardMedia
                        component="img"
                        sx={{width: 150}}
                        image={product?.image}
                        alt={product.name}/>
                </Box>
                <Box sx={{paddingRight: 30}}/>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardContent sx={{flex: '1 0 auto'}}>
                        <Typography component="div" variant="h5">
                            {product.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            R$ {price}
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
                            <Button variant="contained" onClick={() => navigate(`/details/${id}`)}>
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