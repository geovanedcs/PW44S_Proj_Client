import Card from "@mui/material/Card";
import {Button, ButtonGroup} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import {IProduct} from "@/commons/interfaces.ts";
import {useEffect, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import InfoIcon from '@mui/icons-material/Info';
import ProductService from "@/services/ProductService.ts";
import {useNavigate} from "react-router-dom";
import {useCartContext} from "@/Context/CartContext.tsx";
import {formatCurrency} from "@/commons/formatCurrency.ts";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface props {
    id: number;
}

export function ProductCard({id}: props) {

    const {getQuantity, addOne, removeOne, removeItem} = useCartContext()
    const [product, setProduct] = useState<IProduct>({} as IProduct);
    const [error, setError] = useState("");
    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        const response = await ProductService.findById(id);
        if (response.status === 200) {
            if (getQuantity(id) < response.data.stock) {
                setProduct(response.data);
            } else {
                setError("Quantidade indisponível")
            }
        }
    }
    const navigate = useNavigate();

    return (
        <>
            <Card sx={{display: 'flex', marginBottom: 2, justifyContent: 'space-between'}}>
                <Box key={product.id} sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardMedia
                        component="img"
                        sx={{width: 150}}
                        image={product?.image}
                        alt={product.name}/>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', textAlign: 'end'}}>
                    <CardContent sx={{flex: '1 0 auto'}}>
                        <Typography component="div" variant="h5">
                            {product.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {formatCurrency(product.price)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {error ? (<div>
                            <ButtonGroup>
                                <Button
                                    aria-label="reduce"
                                    onClick={() => removeOne(id)}
                                >
                                    <RemoveIcon fontSize="small"/>
                                </Button>
                                <Button>
                                    {getQuantity(id)}
                                </Button>
                                <Button
                                    aria-label="increase"
                                    onClick={() => addOne(id)}
                                >
                                    <AddIcon fontSize="small"/>
                                </Button>
                            </ButtonGroup>
                        </div>):
                            (<Button variant="contained" disabled={true}>Indisponível</Button>)
                        }
                        <Button variant="contained" onClick={() => removeItem(id)}><DeleteForeverIcon/></Button>
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