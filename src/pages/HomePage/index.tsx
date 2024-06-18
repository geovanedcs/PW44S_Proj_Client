import {useEffect, useState} from "react";
import {IProduct} from "@/commons/interfaces.ts";
import ProductService from "@/services/ProductService.ts";
import {Grid} from "@mui/material";
import ProductCard from "@/components/Card";

export function HomePage() {

    const [data, setData] = useState<IProduct[]>([]);
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const response = await ProductService.findAll();
        if (response.status === 200) {
            setData(response.data);
        }
        console.log(response.data[0])
    }

    return (
        <>
            <main className="container">
                <Grid container spacing={{xs: 3, md: 4}} columns={{xs: 3, sm: 9, md: 12}}>
                    {data.map((product) => (
                        <Grid item xs={2} sm={4} md={4} key={product.id}>
                            <ProductCard name={product.name}
                                         id={product.id}
                                         imgUrl={product?.imgUrl}/>
                        </Grid>
                    ))}
                </Grid>
            </main>
        </>
    )
}