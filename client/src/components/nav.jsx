import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { useRecoilState } from "recoil"
import { useNavigate } from "react-router-dom";
import Login from "./auth/login";
import Register from "./auth/signup";
import AuthService from "../services/auth.service"
import StorageService from "../services/storage.service"

import { loginModal, registerModal } from "../states/auth-modal"
import { loggedInState } from "../states/user";
import { activeState } from "../states/nav";
import { useEffect } from "react";
import ProfileDrop from "./auth/profile-drop";

export default function Nav() {
    let [loginVisible, setLoginVisible] = useRecoilState(loginModal)
    let [registerVisible, setRegisterVisible] = useRecoilState(registerModal)

    let [loggedIn, setLoggedIn] = useRecoilState(loggedInState)
    let [active, setActive] = useRecoilState(activeState)

    let navigate = useNavigate()

    useEffect(() => {
        let token = StorageService.getToken()
        if (token) {
            setLoggedIn(true)
            checkAuth(token)
        } else {
            setLoggedIn(false)
        }
    }, [])

    async function checkAuth(token) {
        try {
            await AuthService.checkAuth(token)
        } catch (e) {
            console.error("checkauth failed!")
            StorageService.removeToken()
            StorageService.removeUser()
            setLoggedIn(false)
        }
    }

    return (
        <div>
            <Navbar variant="floating" isCompact isBordered style={{ position: "fixed" }}>
                <Navbar.Brand>
                    <Text b color="inherit" hideIn="xs" onClick={() => navigate('/')}>
                        Positive Vibes
                    </Text>
                </Navbar.Brand>

                <Navbar.Content hideIn="xs" enableCursorHighlight>
                    <Navbar.Link onClick={() => navigate('/')} isActive={active === 'home'}>Headlines</Navbar.Link>
                    <Navbar.Link isActive={active === 'health'} onClick={() => navigate('/news/health')}>Health</Navbar.Link>
                    <Navbar.Link isActive={active === 'science'} onClick={() => navigate('/news/science')}>Science</Navbar.Link>
                    <Navbar.Link isActive={active === 'india'} onClick={() => navigate('/news/india')}>India</Navbar.Link>
                    <Navbar.Link isActive={active === 'technology'} onClick={() => navigate('/news/technology')}>Technology</Navbar.Link>
                    <Navbar.Link isActive={active === 'sports'} onClick={() => navigate('/news/sports')}>Sports</Navbar.Link>
                    <Navbar.Link isActive={active === 'entertainment'} onClick={() => navigate('/news/entertainment')}>Entertainment</Navbar.Link>
                </Navbar.Content>
                <Navbar.Content>
                    {
                        loggedIn ? <ProfileDrop />

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
