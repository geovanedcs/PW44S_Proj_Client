import {useEffect, useState} from "react";
import {ICategory, IProduct} from "@/commons/interfaces.ts";
import ProductService from "@/services/ProductService.ts";
import {Breadcrumbs, Button, Grid} from "@mui/material";
import ProductCard from "@/components/Card";
import {useNavigate, useParams} from "react-router-dom";

export function HomeFiltered() {

    const [data, setData] = useState<IProduct[]>([]);
    const [category, setCategory] = useState<ICategory>();
    const { id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        const response = await ProductService.findAll();
        if (response.status === 200) {
            const tmp: IProduct[] = [];
            response.data.forEach((product: IProduct) => {
                if (product.category.id === parseInt(id as string)) {
                    tmp.push(product);
                }
            });
            if(tmp.length === 0){
                navigate("/404");
            }else{
                setData(tmp);
                setCategory(tmp[0].category);
            }
        }
    }

    return (
        <>
            <main className="container">
                <Breadcrumbs  separator=">" aria-label="breadcrumb">
                    <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
                    <Button color="inherit" disabled={true} >{category?.name}</Button>
                </Breadcrumbs>
                <Grid container spacing={{xs: 3, md: 4}} columns={{xs: 3, sm: 9, md: 12}}>
                    {data.map((product) => (
                        <Grid item xs={2} sm={4} md={4} key={product.id}>
                            <ProductCard key={product.id}
                                         name={product.name}
                                         id={product.id}
                                         image={product?.image}
                                         price={product.price}
                                         description={product.description}
                                         category={product.category}
                                         stock={product.stock}/>
                        </Grid>
                    ))}
                </Grid>
            </main>
        </>
    )
}