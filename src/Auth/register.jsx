import React, { useState } from 'react';
import { Wrapper, Container, Label } from '../Components/auth';
import { TextField, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { motion } from 'framer-motion';

import Auth from '../services/auth';

function RegisterForm() {
    const [toLogin, setLogin] = useState(false);
    const [btnDisabled, disableBtn] = useState(false);
    const { handleSubmit } = useForm();
    const register = async entry => {
        disableBtn(true)
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const name = document.getElementById("name").value
        const confirm = document.getElementById("comfirm").value
        if (password !== confirm) {
            alert("Passwords dont match!")
        } else {
            await Auth.register(name, email, password).then(data => {
                window.localStorage.removeItem("token")
                setLogin(true);
            }).catch(e => {
                alert("Invalid Input, check the input")
                disableBtn(false)
            })
        }
    };

    if(toLogin === true) {
        return (
            <Redirect to="/login" />
        );
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
                <Label>Register</Label>
                <form id="register" onSubmit={handleSubmit(register)}>
                    <div>
                        <TextField id="name" label="Name" name="name" variant="filled" />
                    </div>
                    <br/>
                    <div>
                        <TextField id="email" label="Email" name="email" variant="filled" />
                    </div>
                    <br />
                    <div>
                        <TextField id="password" label="Password" type="password" variant="filled" />
                    </div>
                    <br/>
                    <div>
                        <TextField id="comfirm" label="Comfirm Password" type="password" variant="filled" />
                    </div>
                    <p></p>
                    <Button disabled={disableBtn} color="secondary" type="submit">Submit</Button>
                </form>
            </div>
        </motion.div>
    );
}

class RegisterComponent extends React.Component {
    render() {
        return (
            <Wrapper>
                <Container>
                    <RegisterForm />
                </Container>
            </Wrapper>
        )
    }
}



export default RegisterComponent;