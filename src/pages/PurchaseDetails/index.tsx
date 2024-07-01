import {useNavigate, useParams} from "react-router-dom";
import {IProduct, IPurchase} from "@/commons/interfaces.ts";
import {useEffect, useState} from "react";
import {PurchaseService} from "@/services/PurchaseService.ts";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ProductService from "@/services/ProductService.ts";

export function PurchaseDetails(){

    const [purchase, setPurchase] = useState<IPurchase>();
    const {id} = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState<IProduct[]>();

    useEffect(() => {
        loadPurchase();
    }, []);

    const loadPurchase = async () => {
        const response = await PurchaseService.findById(parseInt(id as string));
        const prods = await ProductService.findAll();
        if (response.status === 200) {
            setPurchase(response.data);

        } else {
            navigate("/404");
        }
        setProducts(prods);
        console.log(response);
    }

    return(
        <>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2"> Compra: {id}</Typography>
                    {purchase?.items.map((item) => (
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={products?.find((p) => p.id=== item.productRequestDTO.id)?.image}
                                alt={item.productRequestDTO.name}/>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </>
    );
}