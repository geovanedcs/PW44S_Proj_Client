import {Navigate, Outlet, useLocation} from "react-router-dom";
import AuthService from "@/services/AuthService.ts";
import {NavBar} from "@/components/NavBar";

export function AuthenticatedRoutes() {
    const location = useLocation();
const isAuthenticated = AuthService.isAuthenticated();
    return isAuthenticated ? (
        <>
            <NavBar />
            <Outlet />
        </>
    ) : (
        <Navigate to="/login" state={{from: location}} replace/>
    )
}