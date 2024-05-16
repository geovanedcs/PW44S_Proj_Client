import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/input';
import  AuthService from '@/services/AuthService.ts';
import { IUserSignUp } from '@/commons/interfaces.ts';

export function UserSignUpPage() {

    const [form, setForm] = useState({
        displayName: '',
        username: '',
        password: ''
    });

    const [errors, setError] = useState({
        displayName: '',
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState('');
    const [apiSuccess, setApiSuccess] = useState('');

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const onClickSignUp = async () => {
        setPendingApiCall(true);
        const user: IUserSignUp = {
            displayName: form.displayName,
            username: form.username,
            password: form.password,
        };
        const response = await AuthService.signup(user);
        if (response.status === 201 || response.status === 200) {
            setApiSuccess("Cadastro realizado com sucesso!");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            setApiError("Algo deu errado. Por favor, tente novamente.")
            if (response.data.validationErrors) {
                setError(response.data.validationErrors);
            }
        }
        setPendingApiCall(false);
    }

    return (
        <>
            <div className="container">
                <h1 className="text-center">Sign Up</h1>
                <div className="col-12 mb-3">
                    <Input id={"displayName"}
                           name={"displayName"}
                           className={"form-control"}
                           label={"Informe seu nome:"}
                           type={"text"} value={form.displayName}
                           placeholder={"Informe seu nome"}
                           hasError={!!errors.displayName}
                           error={errors.displayName}
                           onChange={onChange}/>
                </div>
                <div className="col-12 mb-3">
                    <Input id={"username"}
                           name={"username"}
                           className={"form-control"}
                           label={"Informe seu usuário:"}
                           type={"text"}
                           value={form.username}
                           placeholder={"Informe seu usuário"}
                           hasError={!!errors.username}
                           error={errors.username}
                           onChange={onChange}/>
                </div>
                <div className="col-12 mb-3">
                    <Input id={"password"}
                           name={"password"}
                           className={"form-control"}
                           label={"Informe sua senha:"}
                           type={"password"}
                           value={form.password}
                           placeholder={"********"}
                           hasError={!!errors.password}
                           error={errors.password}
                           onChange={onChange}/>
                </div>
                {apiError && <div className="alert alert-danger">{apiError}</div>}
                {apiSuccess && <div className="alert alert-success">Cadastro realizado com sucesso!</div>}
                <div className="text-center">
                    <button
                        disabled={pendingApiCall}
                        className="btn btn-primary"
                        onClick={onClickSignUp}>
                        {pendingApiCall && (
                            <div className="spinner-border spinner-border-sm text-light spinner-button"></div>
                        )} Cadastrar
                    </button>
                    <Link className="btn btn-secondary" to="/login">Login</Link>
                </div>
            </div>
        </>
    )
}