import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LaunchIcon from '@mui/icons-material/Launch';
import {useNavigate} from "react-router-dom";

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
                <Button size="small" >
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