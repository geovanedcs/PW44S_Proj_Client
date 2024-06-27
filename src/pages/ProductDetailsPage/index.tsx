import {IProduct} from "@/commons/interfaces.ts";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ProductService from "@/services/ProductService.ts";
import {Accordion, AccordionDetails, AccordionSummary, Button, Divider, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useCartContext} from "@/Context/CartContext.tsx";
import {formatCurrency} from "@/commons/formatCurrency.ts";

export function ProductDetailsPage(){

    const [data, setData] = useState<IProduct>({} as IProduct);
    const {id} = useParams();
    const {addOne} = useCartContext();
    const navigate  = useNavigate();
    const [imgUrl, setImgUrl] = useState<string>('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const response = await ProductService.findById(parseInt(id as string));
        if (response.status === 200) {
            setData(response.data);
            setImgUrl(response.data.image);
        } else {
            navigate("/404");
        }
    }

    return(
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <img src={imgUrl} alt="Imagem do Produto" height={300} width={300}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="h2">{data.name}</Typography>
                                    <Typography>{formatCurrency(data.price)}</Typography>
                                    <Button variant="contained"
                                            onClick={()=> addOne(data.id)}
                                            color="primary">Adicionar ao Carrinho</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{marginTop: 50}}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                              aria-controls="panel1-content"
                                              id="panel1-header">
                                <Typography>Descrição</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Divider/>
                                <Typography dangerouslySetInnerHTML={{__html: data.description}} />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}