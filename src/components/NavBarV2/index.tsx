import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link, useNavigate} from "react-router-dom";
import logo from "@/assets/img/efe9e807814e42e2b0176b80aa0e49ac (1).png";
import {useEffect, useState} from "react";
import {ICategory, IUserLogin} from "@/commons/interfaces.ts";
import CategoryService from "@/services/CategoryService.ts";
import AuthService from "@/services/AuthService.ts";
import {LoginPageModal} from "@/components/ModalLogin";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl, FormLabel, Input,
    TextField
} from "@mui/material";
import {InputRounded} from "@mui/icons-material";

interface IRoute {
    page: string;
    name: string;
}

const pages: IRoute [] = [{page: '/', name: 'Home'}, {page: '/categories', name: 'Categorias'}]
const settings: IRoute[] = [{page: '/categories', name: 'Categorias'},
    {page: '/products', name: 'Produtos'},
    {page: 'logout', name: 'Logout'}];

function ResponsiveAppBar() {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState("");
    const [apiSuccess, setApiSuccess] = useState("");
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElCategory, setAnchorElCategory] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [data, setData] = useState<ICategory[]>([]);
    const [validToken, setValidToken] = useState<boolean>(false);
    const [openLogin, setOpenLogin] = useState(false);
    const handleOpen = () => {
        setOpenLogin(true);
    };

    const handleClose = () => {
        setOpenLogin(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const validToken = await AuthService.isAuthenticatedTokenValid();
        const response = await CategoryService.findAll();
        if (response.status === 200) {
            setValidToken(validToken);
            setData(response.data);
        } else {
            localStorage.removeItem('token');
        }
    }

    const onClickLogout = () => {
        setValidToken(false);
        handleCloseUserMenu()
        localStorage.removeItem('token');
        navigate("/");
    }

    const onClickLogin = async () => {
        const login: IUserLogin = {
            username: form.username,
            password: form.password,
        };

        const response = await AuthService.login(login);
        if (response.status === 200 || response.status === 201) {
            setApiSuccess("Autenticado com sucesso!");
            setTimeout(() => {
                navigate("/");
            }, 1000);

            setOpenLogin(false);
        } else {
            setApiError("Erro ao localizar o usuário!");
        }
        setPendingApiCall(false);
    };

    const handleOpenCategoryMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElCategory(event.currentTarget);
    }

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseCategoryMenu = (whereTo: string) => {
        navigate(whereTo)
        setAnchorElCategory(null);
    }

    const navigate = useNavigate();

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/" className="navbar-brand">
                        <img src={logo} width="60" alt="My Pet Space"/>
                    </Link>
                    <Box key={1} sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) =>
                                <MenuItem key={page.name} onClick={() => handleCloseCategoryMenu(page.page)}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                    <Box key={2} sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page, index) => (page.name != 'Categorias' ? (
                                (<Button
                                    key={index}
                                    onClick={() => handleCloseCategoryMenu(page.page)}
                                    sx={{my: 2, color: 'white', display: 'block'}}

                                >
                                    {page.name}
                                </Button>)) : (
                                <Box key={4} sx={{flexGrow: 0}}>
                                    <Button onClick={handleOpenCategoryMenu}
                                            id={page.name}
                                            aria-controls={anchorElCategory ? 'category-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={anchorElCategory ? 'true' : undefined}
                                            style={{color: "white"}}
                                    >
                                        <Typography textAlign="center" sx={{
                                            my: 2,
                                            color: 'white',
                                            display: 'block'
                                        }}>{page.name}</Typography>
                                    </Button>
                                    <Menu
                                        sx={{mt: '45px'}}
                                        id="category-menu"
                                        anchorEl={anchorElCategory}
                                        open={Boolean(anchorElCategory)}
                                        onClose={handleCloseCategoryMenu}
                                        MenuListProps={{'aria-labelledby': 'category-menu'}}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                    >
                                        {data.map((data, index) => (
                                            <MenuItem key={index} onClick={() => handleCloseCategoryMenu(page.page)}>
                                                <Typography textAlign="center">{data.name}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                            )
                        ))}
                    </Box>
                    {!validToken ? (
                            <Button onClick={() => handleOpen()}>
                                <Typography textAlign="center"
                                            aria-valuetext={"Login"}
                                            sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    Login
                                </Typography>
                            </Button>) :
                        (<Box key={3} sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting, index) => (setting.page != "logout" ?
                                        (
                                            <MenuItem key={index} onClick={() => navigate(setting.page)}>
                                                <Typography textAlign="center">{setting.name}</Typography>
                                            </MenuItem>
                                        ) : (
                                            <MenuItem key={index} onClick={() => onClickLogout()}>
                                                <Typography textAlign="center">{setting.name}</Typography>
                                            </MenuItem>
                                        )
                                ))}
                            </Menu>
                        </Box>)}
                    <Dialog open={openLogin}
                            onClose={handleClose}
                            PaperProps={{
                                component: 'form',
                            }}>
                        <DialogTitle>
                            <Typography textAlign="center">Login</Typography>
                        </DialogTitle>
                        <DialogContent>
                            <FormControl>
                                <FormLabel>
                                    <Typography textAlign="center">Informe seu usuário:</Typography>
                                </FormLabel>
                                <Input
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="username"
                                    name="username"
                                    type="text"
                                    fullWidth/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>
                                    <Typography textAlign="center">Informe sua senha:</Typography>
                                </FormLabel>
                                <Input
                                    required
                                    margin="dense"
                                    id="password"
                                    name="password"
                                    type="password"
                                    fullWidth/>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {
                                navigate("/signup")
                                handleClose()
                            }}>Cadastre-se</Button>
                            <Button onClick={handleClose}>Cancelar</Button>
                            <Button type="submit" onSubmit={onClickLogin}>Login</Button>
                        </DialogActions>
                    </Dialog>
                </Toolbar>
            </Container>

        </AppBar>
    );
}

export default ResponsiveAppBar;
