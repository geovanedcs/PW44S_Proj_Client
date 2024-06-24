import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LaunchIcon from '@mui/icons-material/Launch';
import {useNavigate} from "react-router-dom";
import {PurchaseService} from "@/services/PurchaseService.ts";
import ProductService from "@/services/ProductService.ts";

interface IProdCard {
    id: any;
    name: string;
    imgUrl?: string;
}

export default function ProductCard({
                                        id,
                                        name,
                                        imgUrl,
                                    }: IProdCard) {

    const navigate = useNavigate();

    const onClickNavigate = () => {
        navigate(`/details/${id}`);
    }

    const onClickAddCart = async () => {
        const prod = await ProductService.findById(id)
        const response = await PurchaseService.addToCart(prod.data);
        if(response.error) {
            alert(response.error);
        }
    }

    return (
        <Card sx={{maxWidth: 340, height: 340, display: "flex", flexDirection: "column"}}>
            <CardMedia
                sx={{height: 140}}
                image={imgUrl}
                title={name}
            />
            <CardContent sx={{mt: "auto"}}>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{mt: "auto"}}>
                <Button size="small" onClick={onClickAddCart}>
                    <AddShoppingCartIcon/>
                    Adicionar ao carrinho
                </Button>
                <Button size="small" onClick={() => onClickNavigate()}>
                    <LaunchIcon/>
                    Detalhes
                </Button>
            </CardActions>
        </Card>
    );
}
