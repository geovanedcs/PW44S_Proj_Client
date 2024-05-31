import {useEffect, useState} from "react";
import {IProduct} from "@/commons/interfaces.ts";
import ProductService from "@/services/ProductService.ts";
import {Link, useNavigate} from "react-router-dom";
import { Button, Divider, Menu, MenuItem,} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export function ProductListPage() {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = async () => {
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

    const navigate = useNavigate();

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
                                        endIcon={<MoreVertIcon/>}
                                    >
                                    </Button>
                                    <Menu
                                        id="demo-customized-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'demo-customized-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={() => navigate(`/products/${product.id}`)} disableRipple>
                                            <EditIcon/>
                                            Edit
                                        </MenuItem>
                                        <MenuItem onClick={() => onClickDelete(product.id)} disableRipple>
                                            <DeleteForeverIcon/>
                                            Delete
                                        </MenuItem>
                                        <Divider sx={{my: 0.5}}/>
                                    </Menu>
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