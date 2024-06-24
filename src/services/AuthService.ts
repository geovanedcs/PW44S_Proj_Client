import {api} from '@/libs/axios.ts';
import {IUserLogin} from '@/commons/interfaces.ts';

const signup = async (user: IUserLogin): Promise<any> => {
    let response;
    try {
        response = await api.post('/users', user);
    } catch (error: any) {
        response = error.response;
    }
    return response;
}
const login = async (user: IUserLogin): Promise<any> => {
    let response;
    try {
        response = await api.post("/login", user);
        if(response.status === 200) {
            localStorage.setItem("token", JSON.stringify(response.data.token));
            api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
        }
    } catch (error: any) {
        response = error.response;
    }
    return response;
};

const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    if(token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(token)}`;
        return true;
    }
    return false;
}

const isAuthenticatedTokenValid = async(): Promise<boolean> => {
    const token = localStorage.getItem("token");
    let response;
    try {
        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(token)}`;
            response = await api.get("/users/validateToken");
            if(response.status != 500)
            return true;
        }
        return false;
    } catch (error: any) {
        return false;
    }
}

const logout = (): void => {
    localStorage.removeItem("token");
    api.defaults.headers.common["Authorization"] = '';
}


const AuthService = {
    signup,
    login,
    isAuthenticated,
    logout,
    isAuthenticatedTokenValid,
};

export default AuthService;