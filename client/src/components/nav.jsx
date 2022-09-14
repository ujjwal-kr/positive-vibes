import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { useRecoilState } from "recoil"
import { loginModal, registerModal } from "../states/auth-modal"
import Login from "./auth/login";
import Register from "./auth/signup";

import { loggedInState } from "../states/user";

export default function Nav() {
    let [loginVisible, setLoginVisible] = useRecoilState(loginModal)
    let [registerVisible, setRegisterVisible] = useRecoilState(registerModal)
    let [loggedIn, setLoggedIn] = useRecoilState(loggedInState)

    return (
        <div>
            <Navbar variant="floating" isCompact isBordered style={{ position: "fixed" }}>
                <Navbar.Brand>
                    <Text b color="inherit" hideIn="xs">
                        Positive Vibes
                    </Text>
                </Navbar.Brand>

                <Navbar.Content hideIn="xs" enableCursorHighlight>
                    <Navbar.Link isActive href="#">Headlines</Navbar.Link>
                    <Navbar.Link href="#">Health</Navbar.Link>
                    <Navbar.Link href="#">Science</Navbar.Link>
                    <Navbar.Link href="#">India</Navbar.Link>
                    <Navbar.Link href="#">Technology</Navbar.Link>
                    <Navbar.Link href="#">Sports</Navbar.Link>
                    <Navbar.Link href="#">Entertainment</Navbar.Link>
                </Navbar.Content>
                <Navbar.Content>
                    {
                        loggedIn ? "Welcome"

                            :
                            <>
                                <Navbar.Link onClick={() => setLoginVisible(true)} color="inherit" href="#">
                                    Login
                                </Navbar.Link>
                                <Navbar.Item>
                                    <Button onPress={() => setRegisterVisible(true)} auto flat as={Link} href="#">
                                        Sign Up
                                    </Button>
                                </Navbar.Item>
                            </>

                    }
                </Navbar.Content>
            </Navbar>

            <Login />
            <Register />
        </div>
    )
}
