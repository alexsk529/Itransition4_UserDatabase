import React from "react";
import Error from './Error.jsx';
import {AuthContext} from "../context/AuthContext.js";
import {Button,CssBaseline, TextField, Box, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from "../axios.js";

const Signin = ({form, handlerChange, errorMessage, setErrorMessage}) => {

    const [status, setStatus] = React.useState('');
    const [isPending, setIsPending] = React.useState(false)
    const [showMessage, setShowMessage] = React.useState(true)
    const {login} = React.useContext(AuthContext)

    React.useEffect(()=> {
        let timer;
        if (status && status!==200) {
            timer = setTimeout(()=>setShowMessage(false), 2500)
        }
        return (()=> clearTimeout(timer))
    }, [status])

    const handlerLogin = async () => {
        try {
            setIsPending(true)
            await axios.post('api/auth/signin', {...form}, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => {
                    login(res.data.token, res.data.userId);
                    setStatus(res.status)
                })
        } catch(e) {
            console.log(e)
            setStatus(e.response.status);
            setErrorMessage(e.response.data.message)
            setIsPending(false)
        }
    }
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

                    <Box component="form" onSubmit={(e)=> e.preventDefault()} noValidate sx={{ mt: 1 }}>
                        <TextField
                            sx={{height: '50%'}}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                            onChange={handlerChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={handlerChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handlerLogin}
                        >
                            {isPending ? 'Loading...' : 'Sign In'}
                        </Button>
                    </Box>
                    <Error errorMessage={errorMessage} status={status} showMessage={showMessage}/>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Signin