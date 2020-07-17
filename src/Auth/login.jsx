import React from 'react';
import { Wrapper, Container, Label } from '../Components/auth';
import {TextField, Button} from '@material-ui/core';
import { useForm } from 'react-hook-form';

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

function LoginForm() {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div>
            <Label>Login</Label>
            <form noValidate autoComplete="off">
                <TextField name = "email" label="Email" variant="filled" ref = {register({required: true})} /> <br /> <br/>
                <TextField name = "password" label="Password" type="password" ref = {register({required: true})} variant="filled" /> <br/> <br/>
                <Button name="btn" type="submit">Login</Button>
            </form>
        </div>
    );
}

export default LoginComponent;