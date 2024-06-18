
import {Link, useNavigate} from "react-router-dom";
import {ChangeEvent, useState} from "react";
import AuthService from "@/services/AuthService.ts";
import {IUserLogin} from "@/commons/interfaces.ts";
import {Fade, Modal} from "@mui/material";
import Box from "@mui/material/Box";

export function LoginPageModal({ open , handleClose }) {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState("");
    const [apiSuccess, setApiSuccess] = useState("");
    const navigate = useNavigate();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            };
        });
    };

    const onClickLogin = async () => {
        const login: IUserLogin = {
            username: form.username,
            password: form.password,
        };

        const response = await AuthService.login(login);
        if (response.status === 200 || response.status === 201) {
            setApiSuccess("Login successful!");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } else {
            setApiError("Error logging in!");
        }

        setPendingApiCall(false);
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <h1 className="text-center">Login</h1>
                        <div className="col-12 mb-3">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={form.username}
                                placeholder="Enter your username"
                                className="form-control"
                                onChange={onChange}
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={form.password}
                                placeholder="******"
                                className="form-control"
                                onChange={onChange}
                            />
                        </div>
                        {apiError && (
                            <div className="alert alert-danger text-center">{apiError}</div>
                        )}
                        {apiSuccess && (
                            <div className="alert alert-success text-center">{apiSuccess}</div>
                        )}
                        <div className="text-center">
                            <button
                                disabled={pendingApiCall}
                                className="btn btn-primary"
                                onClick={onClickLogin}
                            >
                                {pendingApiCall && (
                                    <div
                                        className="spinner-border spinner-border-sm text-light-spinner mr-sm-1"
                                        role="status"
                                    ></div>
                                )}
                                Login
                            </button>
                        </div>
                        <div className="text-center">
                            <Link to="/signup"
                                  className="btn btn-primary">
                                Sign Up
                            </Link>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}