import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {PurchaseService} from "@/services/PurchaseService.ts";

const steps = ['Endereço', 'Pagamento', 'Revisar Pedido'];

export default function CheckOutPage() {

    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const nextPage = async () => {
        const preShop = await PurchaseService.getPrePurchase();
        await PurchaseService.preSavePurchase(preShop);
        handleNext();
    }

    const backPage = async () => {
        const preShop = await PurchaseService.getPrePurchase();
        await PurchaseService.preSavePurchase(preShop);
        handleBack();
    }

    const onClickCheckOut = async () => {
        const preShop = await PurchaseService.getPrePurchase();
        const response  = await PurchaseService.save(preShop);
        if(response.status === 200){
            navigate("/");
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
            {activeStep === steps.length - 1 ? (
                <>
                    <Typography sx={{mt: 2, mb: 1}}>
                        Revise sua compra
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        <Box sx={{flex: '1 1 auto'}}/>
                        <Button onClick={() => onClickCheckOut()}>Finalizar Compra</Button>
                    </Box>
                </>
            ) : (
                <>
                    <Typography sx={{mt: 2, mb: 1}}>{steps[activeStep]}</Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={backPage}
                            sx={{mr: 1}}
                        >
                            Back
                        </Button>
                        <Box sx={{flex: '1 1 auto'}}/>
                        <Button onClick={nextPage}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
}