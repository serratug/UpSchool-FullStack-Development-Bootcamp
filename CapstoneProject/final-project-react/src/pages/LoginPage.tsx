import React, {useContext, useState} from "react";
import {AuthLoginCommand, LocalJwt} from "../types/AuthTypes.ts";
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

const BASE_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
    const { setAppUser } = useContext(AppUserContext);

    const navigate = useNavigate();

    const [authLoginCommand, setAuthLoginCommand] = useState<AuthLoginCommand>({email:"",password:""});

    const handleSubmit = async (event:React.FormEvent) => {

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                    height: "50vh",
                    width: "45vw",
                    p: 8,
                }}
            >
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="h5" align="center" color="secondary">
                            Log-in to your account
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        placeholder="Email"
                                        value={authLoginCommand.email}
                                        onChange={handleInputChange}
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
                                        onChange={handleInputChange}
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
                                        onClick={handleSubmit}
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
            </Paper>
        </Box>
    );
}

export default LoginPage