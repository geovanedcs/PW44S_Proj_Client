import {PurchaseService} from "@/services/PurchaseService.ts";
import {useEffect, useState} from "react";
import {CheckoutTotals} from "@/components/CheckoutTotals";
import {Grid} from "@mui/material";
import {ProductCard} from "@/components/CheckoutItems";
import {IProduct} from "@/commons/interfaces.ts";
import ProductService from "@/services/ProductService.ts";

export function CartDetails() {

    const [total, setTotal] = useState(0);
    const [cart, setCart] = useState<IProduct[]>([]);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        const preCart = await PurchaseService.retrieveCart();
        const tmpCart: IProduct[] = [];
        for (const item of preCart) {
            const response = await ProductService.findById(item.product.id);
            if (response.status === 200) {
                tmpCart.push(response.data);
            }
        }
        setCart(tmpCart);
        const total = cart.reduce((sum: any, product: IProduct) => sum + product.price, 0);
        setTotal(total.toFixed(2));
    }



    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6} md={8} >
                    {cart && (
                        <>
                            {cart.map((product) => (
                                <ProductCard key={product.id} id={product.id}/>
                            ))}
                        </>
                    )}
                </Grid>
                <Grid item xs={6} md={4}>
                    <CheckoutTotals total={total} discount={10}/>
                </Grid>
            </Grid>
        </>
    );
}