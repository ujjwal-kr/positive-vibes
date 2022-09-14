import { useRecoilState } from "recoil"
import { registerModal } from "../../states/auth-modal"
import { userState, tokenState, loggedInState } from "../../states/user"
import { Button, Text, Modal, Input } from "@nextui-org/react"
import AuthService from "../../services/auth.service"
import StorageService from "../../services/storage.service"
import { useState } from "react";

export default function Register() {
    const [visible, setVisible] = useRecoilState(registerModal)
    const [user, setUser] = useRecoilState(userState)
    const [token, setToken] = useRecoilState(tokenState)
    const [logged, setLogged] = useRecoilState(loggedInState)

    const closeHandler = () => {
        setVisible(false)
    };

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    async function submit() {
        try {
            try {
                await AuthService.register(name, email, password)
            } catch (e) {
                alert("Something went wrong")
            }

            let loginRes = await AuthService.login(email, password)
            setUser(loginRes.data.user)
            setToken(loginRes.data.token)
            StorageService.setUser(loginRes.data.user)
            StorageService.setToken(loginRes.data.token)
            setLogged(true)
            setVisible(false)
            console.log(loginRes.data);
        } catch (e) {
            console.error(e)
            alert("Something went wrong")
        }
    }

    return (
            <Modal
                closeButton
                blur
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        <Text b size={25}>
                            Register
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body>
                <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        required
                        value={name}
                        aria-label="Name"
                        onChange={(e) => 
                            setName(e.target.value)}
                        placeholder="Name"
                    />
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        required
                        aria-label="Email"
                        value={email}
                        onChange={(e) => 
                            setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        type="password"
                        required
                        aria-label="Password"
                        value={password}
                        onChange={(e) => 
                            setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onPress={closeHandler}>
                        Close
                    </Button>
                    <Button auto onPress={async () => await submit()}>
                        Sign Up
                    </Button>
                </Modal.Footer>
            </Modal>
    )
}