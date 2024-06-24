import {PurchaseService} from "@/services/PurchaseService.ts";
import {useEffect, useState} from "react";
import {CheckoutTotals} from "@/components/CheckoutTotals";
import {Grid} from "@mui/material";
import {ProductCard} from "@/components/CheckoutItems";
import {IProduct} from "@/commons/interfaces.ts";

export function CartDetails() {

    const [total, setTotal] = useState(0);
    const [data, setData] = useState<IProduct[]>([]);
    useEffect(() => {
        loadData();
    }, []);


    const loadData = async () => {
        const preCart = await PurchaseService.retrieveCart();
        console.log(preCart)
        setData(preCart);
        const total = preCart.reduce((sum: any, product: IProduct ) => sum + product.price, 0);
        setTotal(total.toFixed(2));
        console.log(data)
    }


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    <ProductCard prod={data[1]}/>
                </Grid>
                <Grid item xs={6} md={4}>
                    <CheckoutTotals total={total} discount={10}/>
                </Grid>
            </Grid>
        </>
);
}