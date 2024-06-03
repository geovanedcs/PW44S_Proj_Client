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
import {ICategory} from "@/commons/interfaces.ts";
import CategoryService from "@/services/CategoryService.ts";

interface IRoute {
    page: string;
    name: string;
}

const pages: IRoute [] = [{page: '/', name: 'Home'}, {page: '/categories', name: 'Categorias'}]
const settings: IRoute[] = [{page: '/categories', name: 'Categorias'}, {page: '/products', name: 'Produtos'}];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElCategory, setAnchorElCategory] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [data, setData] = useState<ICategory[]>([]);
    const [validToken, setValidToken] = useState<boolean>(false);
    useEffect(() => {
        loadData();
    }, [data]);

    const loadData = async () => {
        const response = await CategoryService.findAll();
        if (response.status === 200) {
            setData(response.data);
            setValidToken(true);
        } else {
            localStorage.removeItem('token');
        }
    }

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

    const handleCloseCategoryMenu = () => {
        setAnchorElCategory(null);
    }

    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/" className="navbar-brand">
                        <img src={logo} width="60" alt="My Pet Space"/>
                    </Link>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
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
                                <MenuItem key={page.name} onClick={() => {
                                    navigate(page.page);
                                    handleCloseCategoryMenu();
                                }}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (page.name != 'Categorias' ? (
                                (<Button
                                    key={page.name}
                                    onClick={() => navigate(page.page)}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {page.name}
                                </Button>)) : (
                                (
                                    <Button onClick={handleOpenCategoryMenu}>
                                        <Box sx={{flexGrow: 0}}>
                                            {page.name}
                                            <Menu
                                                sx={{mt: '45px'}}
                                                id="category-appbar"
                                                anchorEl={anchorElCategory}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={Boolean(anchorElCategory)}
                                                onClose={handleCloseCategoryMenu}
                                            >
                                                {data.map((data) => (
                                                    <MenuItem key={data.name} onClick={() => navigate("/")}>
                                                        <Typography textAlign="center">{data.name}</Typography>
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </Box>
                                    </Button>
                                )
                            )
                        ))}
                    </Box>
                    {validToken ? (<Box sx={{flexGrow: 0}}>
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
                            {settings.map((setting) => (
                                <MenuItem key={setting.name} onClick={() => navigate(setting.page)}>
                                    <Typography textAlign="center">{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>): (
                        <Button onClick={() => navigate("/login")}>
                            <Typography textAlign="center"
                                        aria-valuetext={"Login"}
                            >
                                Login
                            </Typography>
                        </Button>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
