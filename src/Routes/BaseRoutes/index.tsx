import {Route, Routes} from "react-router-dom";
import {LoginPage} from "@/pages/LoginPage";
import {UserSignUpPage} from "@/pages/UserSignUpPage";
import {AuthenticatedRoutes} from "@/Routes/AuthenticatedRoutes";
import {HomePage} from "@/pages/HomePage";
import {CategoryListPage} from "@/pages/CategoryListPage";

export function BaseRoutes() {
    return (
        <>
            <NavBar/>
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
                </Route>
            </Routes>
        </>
    )
}