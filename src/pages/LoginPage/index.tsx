import {ChangeEvent, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export function LoginPage(){

    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    function onChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    function onClickLogin(){
        axios.post('http://localhost:8025/login', form)
            .then((response) => {
            console.log(response.data)
                localStorage.setItem('token', JSON.stringify(response.data))
            })
            .catch((error) =>{
            console.log(error)
            })
    }

    return (
        <>
            <div className="container">
                <h1 className="text-center">Login</h1>
                <div className="col-12 mb-3">
                    <label htmlFor="username">Informe seu usuário:</label>
                    <input id="username" type="text" name="username" placeholder="Informe seu usuário"
                           className="form-control" onChange={onChange}/>
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="password">Informe sua senha:</label>
                    <input id="password" type="password" name="password" placeholder="********"
                           className="form-control" onChange={onChange}/>
                </div>
                <div className="text-center ">
                    <button className="btn btn-primary" onClick={onClickLogin}>Entrar</button>
                    <Link className="btn btn-secondary" to="/signup">Cadastre-se</Link>
                </div>
            </div>
        </>
    )
}