import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';

import MainPage from "../MainPage/MainPage";
import { ButtonGroup, Button, Container } from '@mui/material';
import Signin from '../../components/Signin.jsx'
import Signup from '../../components/Signup.jsx'
import './AuthPage.css'

const AuthPage = () => {
    const [form, setForm] = React.useState({
        email: '',
        password: '',
    })
    const [errorMessage, setErrorMessage] = React.useState('')
    const handlerChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }
    return (

            <React.Fragment>
                <Container maxWidth="320px" sx={{pt: 3}}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group" padding={150}>
                        <Button><Link to="/signin">Sign in</Link></Button>
                        <Button><Link to="/signup">Sing up</Link></Button>
                    </ButtonGroup>
                </Container>

                <Routes>
                    <Route path="/signin" element={<Signin form={form} handlerChange={handlerChange} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}/>

                    <Route path="/signup" element={<Signup form={form} handlerChange={handlerChange} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}/>
                    <Route path="/main" element={<MainPage/>}/>
                </Routes>
            </React.Fragment>


    )
}

export default AuthPage