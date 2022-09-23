import { useRecoilState } from "recoil"
import { loginModal } from "../../states/modal"
import { Button, Text, Modal, Input } from "@nextui-org/react"
import { loggedInState, settingState } from "../../states/user"
import AuthService from "../../services/auth.service"
import StorageService from "../../services/storage.service"
import { useState } from "react"

export default function Login() {
    const [visible, setVisible] = useRecoilState(loginModal)
    const [setting, setSetting] = useRecoilState(settingState)
    const [logged, setLogged] = useRecoilState(loggedInState)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    async function onSubmit() {
        try {
            let res = await AuthService.login(email, password)
            StorageService.setUser(res.data.user)
            StorageService.setToken(res.data.token)
            setLogged(true)
            setSetting(res.data.user.setting)
            setVisible(false)
        } catch (e) {
            console.log(e)
            alert("Email/Password invalid")
        }
    }

    const closeHandler = () => {
        setVisible(false)
    };

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
                        Login
                    </Text>
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Input
                    aria-label="Email"
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Email"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <Input.Password
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    type="password"
                    aria-label="Email"
                    placeholder="Password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onPress={closeHandler}>
                    Close
                </Button>
                <Button auto onPress={async () => 
                    await onSubmit()}
                >
                    Sign in
                </Button>
            </Modal.Footer>
        </Modal>
    )
}