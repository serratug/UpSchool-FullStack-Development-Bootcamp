import React, {useContext, useState} from "react";
import {AuthLoginCommand, AuthRegisterCommand, LocalJwt} from "../types/AuthTypes.ts";
import api from "../utils/axiosInstance.ts";
import {getClaimsFromJwt} from "../utils/jwtHelper.ts";
import {AppUserContext} from "../context/StateContext.tsx";
import {toast} from "react-toastify";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Google} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const BASE_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
    const { setAppUser } = useContext(AppUserContext);

    const navigate = useNavigate();

    const [authLoginCommand, setAuthLoginCommand] = useState<AuthLoginCommand>({email:"",password:""});

    const [authRegisterCommand, setAuthRegisterCommand] = useState<AuthRegisterCommand>
    ({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleLoginSubmit = async (event:React.FormEvent) => {

        event.preventDefault();

        try {
            const response = await api.post("/Authentication/Login", authLoginCommand);

            if(response.status === 200){
                const accessToken = response.data.data.accessToken;
                const { uid, email, given_name, family_name} = getClaimsFromJwt(accessToken);
                const expires:string = response.data.data.expires;

                setAppUser({ id:uid, email, firstName:given_name, lastName:family_name, expires, accessToken });

                const localJwt:LocalJwt ={
                    accessToken,
                    expires
                }

                localStorage.setItem("crawler_user",JSON.stringify(localJwt));
                navigate("/");
            } else{
                toast.error(response.statusText);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }

    }

    const handleRegisterSubmit = async (event:React.FormEvent) => {

        event.preventDefault();

        try {
            const response = await api.post("/Authentication/Register", authRegisterCommand);

            if(response.status === 200){
                navigate("/");
            } else{
                toast.error(response.statusText);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }

    }

    const handleRegisterInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthRegisterCommand({
            ...authRegisterCommand,
            [event.target.name]: event.target.value
        });
    }

    const handleLoginInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthLoginCommand({
            ...authLoginCommand,
            [event.target.name]: event.target.value
        });
    }

    const onGoogleLoginClick = (e:React.FormEvent) => {
        e.preventDefault();

        window.location.href = `${BASE_URL}/Authentication/GoogleSignInStart`;
    };



    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "secondary",
            }}
        >
            <Paper
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    height: "max-content",
                    width: "70vw",
                    p: "7vh",
                }}
            >
                <Grid container spacing={2} justifyContent="center" width="30vw"
                      style={{minWidth: "200px", maxWidth: "300px"}}
                >
                    <Grid item xs={12}>
                        <Typography variant="h5" align="center" color="secondary">
                            Log-in to your account
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <form onSubmit={handleLoginSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        placeholder="Email"
                                        value={authLoginCommand.email}
                                        onChange={handleLoginInputChange}
                                        name="email"
                                        color="secondary"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        placeholder="Password"
                                        type="password"
                                        value={authLoginCommand.password}
                                        onChange={handleLoginInputChange}
                                        name="password"
                                        color="secondary"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        onClick={handleLoginSubmit}
                                    >
                                        Login
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        size="large"
                                        startIcon={<Google />}
                                        onClick={onGoogleLoginClick}
                                        color="secondary"
                                    >
                                        Sign in with Google
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>

                <Divider orientation="vertical" flexItem style={{marginLeft: "4vw", marginRight: "4vw"}}>
                    or
                </Divider>

                <Grid container spacing={2} justifyContent="center" width="30vw"
                      style={{minWidth: "200px", maxWidth: "300px"}}
                >
                    <Grid item xs={12}>
                        <Typography variant="h5" align="center" color="secondary">
                            Register
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <form onSubmit={handleRegisterSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        placeholder="First Name"
                                        value={authRegisterCommand.firstName}
                                        onChange={handleRegisterInputChange}
                                        name="firstName"
                                        color="secondary"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        placeholder="Last Name"
                                        value={authRegisterCommand.lastName}
                                        onChange={handleRegisterInputChange}
                                        name="lastName"
                                        color="secondary"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        placeholder="Email"
                                        value={authRegisterCommand.email}
                                        onChange={handleRegisterInputChange}
                                        name="email"
                                        color="secondary"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        placeholder="Password"
                                        type="password"
                                        value={authRegisterCommand.password}
                                        onChange={handleRegisterInputChange}
                                        name="password"
                                        color="secondary"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        onClick={handleRegisterSubmit}
                                    >
                                        Sign Up
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

export default LoginPage