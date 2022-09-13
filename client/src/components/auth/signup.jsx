import { useRecoilState } from "recoil"
import { registerModal } from "../../states/auth-modal"
import { Button, Text, Modal, Input } from "@nextui-org/react"

export default function Register() {
    const [visible, setVisible] = useRecoilState(registerModal)

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
                        placeholder="Name"
                    />
                    <Input
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
                        placeholder="Password"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={closeHandler}>
                        Close
                    </Button>
                    <Button auto onClick={closeHandler}>
                        Sign in
                    </Button>
                </Modal.Footer>
            </Modal>
    )
}