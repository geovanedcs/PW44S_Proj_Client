import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useNavigate} from "react-router-dom";
import {useCartContext} from "@/Context/CartContext.tsx";
import {Snackbar} from "@mui/material";
import React, {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import {IProduct} from "@/commons/interfaces.ts";
import {formatCurrency} from "@/commons/formatCurrency.ts";

export interface SnackbarMessage {
    message: string;
    key: number;
}

export default function ProductCard({
                                        id,
                                        name,
                                        image,
                                        price,
                                        category
                                    }: IProduct) {

    const [addSuccess, setAddSuccess] = useState(false);
    const [snackPack, setSnackPack] = React.useState<readonly SnackbarMessage[]>([]);
    const [messageInfo, setMessageInfo] = React.useState<SnackbarMessage | undefined>(
        undefined,
    );
    const {addOne, removeOne} = useCartContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (snackPack.length && !messageInfo) {
            // Set a new snack when we don't have an active one
            setMessageInfo({...snackPack[0]});
            setSnackPack((prev) => prev.slice(1));
            setAddSuccess(true);
        } else if (snackPack.length && messageInfo && addSuccess) {
            // Close an active snack when a new one is added
            setAddSuccess(false);
        }
    }, [snackPack, messageInfo, addSuccess]);

    const handleExited = () => {
        setMessageInfo(undefined);
    };

    const onClickNavigate = () => {
        navigate(`/details/${id}`);

    }
    const handleCloseSnackbar = () => {
        setAddSuccess(false);
    }

    const onClickAdd = (message: string) => {
        setSnackPack((prev) => [...prev, {message, key: new Date().getTime()}]);
        addOne(id);
        setAddSuccess(true);
    }

    const onClickUndo = () => {
        removeOne(id);
        setAddSuccess(false);
    }

    return (
        <Card sx={{height: 400, display: "flex", flexDirection: "column"}}>
            <CardMedia
                sx={{height: "100%", width: "75%", objectFit: "fit", margin: "auto"}}
                image={image}
                title={"Clique para mais detalhes."}
                onClick={() => onClickNavigate()}
                onMouseEnter={(e) => e.currentTarget.style.cursor = "pointer"}
            />
            <CardContent>
                <Typography gutterBottom variant="h6">
                    {name.toLowerCase()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {formatCurrency(price)} / {category.name}
                </Typography>
            </CardContent>
            <CardActions sx={{justifyContent: "center"}}>
                <Button variant="contained" onClick={() => onClickAdd("Adicionado com sucesso")}>
                    <AddShoppingCartIcon/>
                    Adicionar ao carrinho
                </Button>
            </CardActions>
            <Snackbar open={addSuccess}
                      autoHideDuration={6000}
                      onClose={handleCloseSnackbar}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                      TransitionProps={{onExited: handleExited}}
                      message={messageInfo ? messageInfo.message : undefined}
                      action={
                          <React.Fragment>
                              <Button color="secondary" size="small" onClick={onClickUndo}>
                                  Desfazer
                              </Button>
                              <IconButton
                                  aria-label="close"
                                  color="inherit"
                                  sx={{p: 0.5}}
                                  onClick={onClickUndo}
                              >
                                  <CloseIcon/>
                              </IconButton>
                          </React.Fragment>
                      }
            />
        </Card>
    );
}
