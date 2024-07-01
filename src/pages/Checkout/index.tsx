import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {PurchaseService} from "@/services/PurchaseService.ts";
import {CheckOutAddress} from "@/components/CheckOutAddress";
import {CheckoutPayment} from "@/components/CheckoutPayment";
import {CheckoutReview} from "@/components/CheckoutReview";
import {useCartContext} from "@/Context/CartContext.tsx";
import {useCheckoutContext} from "@/Context/CheckoutContext.tsx";

const steps = ['Endereço', 'Pagamento', 'Revisar Pedido'];

export default function CheckOutPage() {

    const [activeStep, setActiveStep] = useState(0);
    const [address, setAddress] = useState(true);
    const [payment, setPayment] = useState(true);
    const [review, setReview] = useState(true);// eslint-disable-line
    const navigate = useNavigate();
    const {cartItems, clearCart} = useCartContext()
    const {getPurchase, addProducts} = useCheckoutContext();

    useEffect(() => {
        showComponent();
    }, [activeStep]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const nextPage = async () => {
        handleNext();
    }

    const backPage = async () => {
        handleBack();
    }

    const onClickCheckOut = async () => {
        const preShop = getPurchase();
        const response  = await PurchaseService.save(preShop);
        if(response.status === 201){
            alert("Compra realizada com sucesso!")
            navigate("/");
            clearCart();
        }
    }

    const showComponent = () => {
        addProducts(cartItems)
        console.log(getPurchase())
        if(activeStep === 0){
            setAddress(false);
            setPayment(true);
            setReview(true)
        }else if(activeStep === 1){
            setAddress(true);
            setPayment(false);
            setReview(true)
        }else if(activeStep === 2){
            setAddress(true);
            setPayment(true);
            setReview(false)
        }else{
            setAddress(true);
            setPayment(true);
            setReview(true)
        }
    }

    return (
        <Box sx={{width: '100%'}}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    return (
                        <Step key={index} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <CheckOutAddress disable={address}/>
            <CheckoutPayment disable={payment}/>
            {activeStep === steps.length - 1 ? (
                <>
                    <CheckoutReview disable={review} />
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        <Box sx={{flex: '1 1 auto'}}/>
                        <Button onClick={() => onClickCheckOut()}>Finalizar Compra</Button>
                    </Box>
                </>
            ) : (
                <>
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={backPage}
                            sx={{mr: 1}}
                        >
                            Voltar
                        </Button>
                        <Box sx={{flex: '1 1 auto'}}/>
                        <Button onClick={nextPage}>
                            {activeStep === steps.length - 1 ? 'Finalizar compra' : 'Próximo'}
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
}