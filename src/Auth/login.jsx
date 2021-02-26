import React, { useState } from 'react';
import { Wrapper, Container, Label } from '../Components/auth';
import { TextField, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { motion } from 'framer-motion';

import Auth from '../services/auth';
import SessionService from '../services/session';


function LoginForm() {
    const [toHome, homeRedirect] = useState(false);
    const [btnDisabled, disableBtn] = useState(false);
    const { handleSubmit } = useForm();
    const login = async entry => {
        disableBtn(true)
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        await Auth.login(email, password).then(data => {
            const token = data.data.token
            window.localStorage.setItem("user", JSON.stringify(data.data.user));
            SessionService.setUser(data.data.user)
            window.localStorage.setItem("token", token);
            const form = document.getElementById("login");
            form.reset();
            homeRedirect(true);
        }).catch(e => {
            alert("Invalid Input, check email and Password")
            disableBtn(false)
        })
    };

    if (toHome === true) {
        return <Redirect to="/" />
    }

    return (
        <motion.div initial="hidden" animate="visible" variants={{
            hidden: {
                opacity: 0,
                scale: .5
            },
            visible: {
                opacity: 1,
                scale: 1,
                transition: {
                    delay: .3
                }
            }
        }}>
            <div style={{ padding: 2 + '%' }}>
                <Label>Login</Label>
                <form id="login" onSubmit={handleSubmit(login)}>
                    <div>
                        <TextField id="email" label="email" name="email" variant="filled" />
                    </div>
                    <br />
                    <div>
                        <TextField id="password" label="Password" type="password" variant="filled" />
                    </div>
                    <p></p>
                    <Button disabled={btnDisabled} color="secondary" type="submit">Submit</Button>
                </form>
            </div>
        </motion.div>
    );
}

class LoginComponent extends React.Component {
    render() {
        return (
            <Wrapper>
                <Container>
                    <LoginForm />
                </Container>
            </Wrapper>
        )
    }
}



export default LoginComponent;