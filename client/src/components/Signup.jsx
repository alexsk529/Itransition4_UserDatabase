import React from "react";
import Result from './Result.jsx';
import {Box, Button, CssBaseline, TextField, Container, Grid} from '@mui/material';
import axios from "../axios";

import { createTheme, ThemeProvider } from '@mui/material/styles';


const Signup = ({form, handlerChange, errorMessage, setErrorMessage}) => {
    const [status, setStatus] = React.useState('');
    const [isPending, setIsPending] = React.useState(false)
    const [showMessage, setShowMessage] = React.useState(true)

    const handlerSignup = async () => {
        try {
            setIsPending(true)
            await axios.post('api/auth/signup', {...form}, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => {
                    setErrorMessage(res.data.message)
                    setStatus(res.status)
                    setIsPending(false)
                })
        } catch (e) {
            console.log(e)
            setStatus(e.response.status);
            setErrorMessage(e.response.data.message);
            setIsPending(false)
        }
    }
    React.useEffect(()=> {
        let timer;
        if (status) {
            timer = setTimeout(()=>setShowMessage(false), 2500)
        }
        return (()=> clearTimeout(timer))
    }, [status])
    
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Box component="form" noValidate onSubmit={(e)=> e.preventDefault()} sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={handlerChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={handlerChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handlerChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handlerChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handlerSignup}
                        >
                            {isPending ? 'Loading...' : 'Sign Up'}
                        </Button>
                    </Box>
                </Box>
                {
                    status ?
                    <Result status={status} showMessage={showMessage} errorMessage={errorMessage}/> :
                    null
                }
            </Container>
        </ThemeProvider>
    );
}

export default Signup