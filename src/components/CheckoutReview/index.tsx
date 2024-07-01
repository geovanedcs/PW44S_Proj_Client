import {useCheckoutContext} from "@/Context/CheckoutContext.tsx";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {useCartContext} from "@/Context/CartContext.tsx";
import {IProduct} from "@/commons/interfaces.ts";
import {useEffect, useState} from "react";
import ProductService from "@/services/ProductService.ts";

interface CheckoutReviewProps {
    disable?: any
}

export function CheckoutReview({disable}: CheckoutReviewProps) {

    const [products, setProducts] = useState<IProduct[]>([]);
    const {getPaymentMethod, getAddressWithUnitNumber, getZipCode} = useCheckoutContext();
    const {cartItems} = useCartContext();
    const payMethod = [
        {name: "Débito", method: "DEBIT_CARD"},
        {name: "Crédito", method: "CREDIT_CARD"},
        {name: "Boleto Bancário", method: "BRAZILIAN_BANK_SLIP"},
        {name: "PIX", method: "PIX"},
        {name: "Outros", method: "OTHER"}
    ]

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const response = await ProductService.findAll();
        const tmp: IProduct[] = [];
        if (response.status === 200) {
            response.data.forEach((product: IProduct) => {
                if (cartItems.find((item) => item.productRequestDTO.id === product.id)) {
                    tmp.push(product)
                }
            });
        }
        setProducts(tmp);
    }

    return (
        <>
            <Card sx={{display: !disable ? 'block' : 'none'}}>
                <CardContent>
                    <Typography variant="h4">
                        Resumo do Pedido
                    </Typography>
                    <Typography variant="body1">
                        Endereço: {getAddressWithUnitNumber()}, {getZipCode()}
                    </Typography>
                    <Typography variant="body1">
                        Forma de Pagamento: {payMethod.find((method: {
                        method: string;
                    }) => method.method === getPaymentMethod())?.name}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="h4">
                        Itens do Pedido
                    </Typography>
                    {cartItems.map((item) => (
                        <CardContent key={item.productRequestDTO.id}>
                            <Typography variant="body1">
                                {item.quantity}x {products.find((tmp:{
                                    id: number;
                                }) => tmp.id === item.productRequestDTO.id)?.name
                            } -
                                R$ {products.find((tmp:{
                                id: number;
                            }) => tmp.id === item.productRequestDTO.id)?.price
                            }
                            </Typography>
                        </CardContent>
                    ))}
                </CardContent>
            </Card>
        </>
    )
}