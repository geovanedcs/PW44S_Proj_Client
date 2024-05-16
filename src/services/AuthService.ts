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

const AuthService = {
    signup,
}

export default AuthService;