import {useEffect, useState} from "react";
import {CheckoutTotals} from "@/components/CheckoutTotals";
import {Grid, Stack} from "@mui/material";
import {ProductCard} from "@/components/CheckoutItems";
import { IProduct} from "@/commons/interfaces.ts";
import ProductService from "@/services/ProductService.ts";
import {useCartContext} from "@/Context/CartContext.tsx";

export function CartDetails() {

    const [total, setTotal] = useState(0);
    const { cartItems, cartQuantity, totalAmount } = useCartContext();
    const [products, setProducts] = useState<IProduct[]>([]);

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
            <Grid container spacing={2} justifyContent="center" alignItems="center">
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
                    <CheckoutTotals total={total} discount={10}/>
                </Grid>
            </Grid>
        </>
    );
}