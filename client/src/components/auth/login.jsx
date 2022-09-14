import { useRecoilState } from "recoil"
import { loginModal } from "../../states/auth-modal"
import { Button, Text, Modal, Input } from "@nextui-org/react"

export default function Login() {
    const [visible, setVisible] = useRecoilState(loginModal)

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
                />
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    type="password"
                    aria-label="Email"
                    placeholder="Password"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onPress={closeHandler}>
                    Close
                </Button>
                <Button auto onPress={closeHandler}>
                    Sign in
                </Button>
            </Modal.Footer>
        </Modal>
    )
}