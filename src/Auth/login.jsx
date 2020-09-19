import React from 'react';
import { Wrapper, Container, Label } from '../Components/auth';
import { TextField, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import URL from '../url';


function LoginForm() {
    const { handleSubmit } = useForm();
    const login = async entry => {
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        axios.post(URL+'auth/login', {email, password})
            .then(data => {
                const token = data.data.token
                window.localStorage.setItem("user", JSON.stringify(data.data.user))
                window.localStorage.setItem("token", token)
                const form =document.getElementById("login")
                form.reset();
            }).catch(e => {
                alert("Invalid Input, check email and Password")
            })
    };

    return (
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
                <Button type="submit">Submit</Button>
            </form>
        </div>
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