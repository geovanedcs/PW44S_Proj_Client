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

export function BaseRoutes() {
    return (
        <>
            <ResponsiveAppBar />
            <Routes>
                {/*Public Routes*/}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<UserSignUpPage />} />
                {/*Private Routes*/}
                <Route element={<AuthenticatedRoutes/>}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/categories" element={<CategoryListPage />} />
                    <Route path="/categories/new" element={<CategoryFormPage />} />
                    <Route path="/categories/:id" element={<CategoryFormPage />} />
                    <Route path="/products" element={<ProductListPage />} />
                    <Route path="/products/new" element={<ProductFormPage />} />
                    <Route path="/products/:id" element={<ProductFormPage />} />
                </Route>
            </Routes>
        </>
    )
}