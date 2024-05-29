import {useEffect, useState} from "react";
import {IProduct} from "@/commons/interfaces.ts";
import ProductService from "@/services/ProductService.ts";
import {Link} from "react-router-dom";
import {alpha, Button, Divider, Menu, MenuItem, MenuProps, styled} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export function ProductListPage() {

    const StyledMenu = styled((props: MenuProps) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color:
                theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    }));
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);
        const handleClick = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = async (id: number | undefined) => {
            if (id) {
                await onClickDelete(id);
            }
            setAnchorEl(null);
        };

    const [data, setData] = useState<IProduct[]>([]);
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const response = await ProductService.findAll();
        if (response.status === 200) {
            setData(response.data);
        }
    }

    const onClickDelete = async (id?: number) => {
        if (id) {
            const response = await ProductService.remove(id);
            if (response.status ===  204) {
                await loadData();
            }
        }
    }

    return (
        <>
            <main className="container">
                <div className="text-center">
                    <h1 className="h3 mb-3 fw-normal">Lista de Produtos</h1>
                    <Link to="/products/new" className="btn btn-primary">Novo Produto</Link>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                    <Button
                                        id="demo-customized-button"
                                        aria-controls={open ? 'demo-customized-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        variant="contained"
                                        disableElevation
                                        onClick={handleClick}
                                        endIcon={<KeyboardArrowDownIcon />}
                                    >
                                        <MoreVertIcon />
                                    </Button>
                                    <StyledMenu
                                        id="demo-customized-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'demo-customized-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose(product.id)} disableRipple>
                                            <EditIcon />
                                            Edit
                                        </MenuItem>
                                        <MenuItem onClick={handleClose} disableRipple>
                                            <DeleteForeverIcon />
                                            Delete
                                        </MenuItem>
                                        <Divider sx={{ my: 0.5 }} />
                                    </StyledMenu>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
}