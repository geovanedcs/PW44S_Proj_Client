import {useEffect, useState} from "react";
import {CheckoutTotals} from "@/components/CheckoutTotals";
import {Breadcrumbs, Button, Grid, Stack} from "@mui/material";
import {ProductCard} from "@/components/CheckoutItems";
import {IProduct} from "@/commons/interfaces.ts";
import ProductService from "@/services/ProductService.ts";
import {useCartContext} from "@/Context/CartContext.tsx";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import empty from "@/assets/empty-cart.svg";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";

export function CartDetails() {

    const [total, setTotal] = useState(0);
    const {cartItems, cartQuantity, totalAmount} = useCartContext();
    const [products, setProducts] = useState<IProduct[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadCart();
    }, [cartQuantity, total]);

    const loadCart = async () => {
        const tmpProducts: IProduct[] = [];
        for (const item of cartItems) {
            const response = await ProductService.findById(item.productRequestDTO.id);
            tmpProducts.push(response.data);
        }
        setProducts(tmpProducts)
        setTotal(totalAmount(tmpProducts));
    }
    return (
        <>
            <Breadcrumbs separator=">" aria-label="breadcrumb" sx={{paddingBottom:5}}>
                <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
                <Button color="inherit" disabled={true}>Carrinho</Button>
            </Breadcrumbs>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                {cartItems && cartItems.length > 0 && (
                    <>
                        <Stack spacing={2}>
                            {products && (
                                <>
                                    {products.map((product) => (
                                        <ProductCard key={product.id} id={product.id}/>
                                    ))}
                                </>
                            )}
                        </Stack>
                        <Grid item xs={6} md={4}>
                            <CheckoutTotals total={total} discount={0}/>
                        </Grid>
                    </>)
                }{cartItems && cartItems.length === 0 && (
                <>
                    <Card sx={{width: '70vw', height: '70vh'}}>
                        <CardContent sx={{margin: 10}}>
                            <img height="200px" src={empty} alt="empty"/>
                            <Box sx={{height: '15vh'}}/>
                            <Typography variant="h5" component="div">
                                Carrinho Vazio
                            </Typography>
                        </CardContent>
                    </Card>
                </>
            )}
            </Grid>
        </>
    );
}