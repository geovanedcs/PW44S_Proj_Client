import {Route, Routes} from "react-router-dom";
import {LoginPage} from "@/pages/LoginPage";
import {UserSignUpPage} from "@/pages/UserSignUpPage";
import {AuthenticatedRoutes} from "@/Routes/AuthenticatedRoutes";
import {HomePage} from "@/pages/HomePage";
import {CategoryListPage} from "@/pages/CategoryListPage";
import {CategoryFormPage} from "@/pages/CategoryFormPage";
import {ProductListPage} from "@/pages/ProductListPage";
import {ProductFormPage} from "@/pages/ProductFormPage";
import ResponsiveAppBar from "@/components/NavBarV2";
import {ProductDetailsPage} from "@/pages/ProductDetailsPage";
import Box from "@mui/material/Box";
import {CartDetails} from "@/pages/CartDetails";
import CheckOutPage from "@/pages/Checkout";
import {HomeFiltered} from "@/pages/HomeFiltered";

export function BaseRoutes() {
    return (
        <>
            <ResponsiveAppBar />
            <Box sx={{height: '64px'}}/>
            <Routes>
                {/*Public Routes*/}
                <Route path="/" element={<HomePage />} />
                <Route path="/categories/:id" element={<HomeFiltered />}/>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<UserSignUpPage />} />
                <Route path="/details/:id" element={<ProductDetailsPage />} />
                <Route path="/cart" element={<CartDetails />} />
                {/*Private Routes*/}
                <Route element={<AuthenticatedRoutes/>}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/categories" element={<CategoryListPage />} />
                    <Route path="/categories/new" element={<CategoryFormPage />} />
                    <Route path="/categories/:id" element={<CategoryFormPage />} />
                    <Route path="/products" element={<ProductListPage />} />
                    <Route path="/products/new" element={<ProductFormPage />} />
                    <Route path="/products/:id" element={<ProductFormPage />} />
                    <Route path="/checkout" element={<CheckOutPage />} />
                </Route>
            </Routes>
        </>
    )
}