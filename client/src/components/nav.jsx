import { Navbar, Button, Link, Text, Input } from "@nextui-org/react";
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
import { FiSettings, FiLogOut, FiPlusCircle, FiLogIn } from "react-icons/fi"

import ProfileDrop from "./auth/profile-drop";
import { DesktopItems, MobileItems } from "../styles/responsive";
import { useState } from "react";

export default function Nav() {
    let [loginVisible, setLoginVisible] = useRecoilState(loginModal)
    let [registerVisible, setRegisterVisible] = useRecoilState(registerModal)

    let [loggedIn, setLoggedIn] = useRecoilState(loggedInState)
    let [active, setActive] = useRecoilState(activeState)

    let navigate = useNavigate()
    let [checked, setChecked] = useState(true)

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
                    <MobileItems>
                        <Navbar.Toggle aria-label="toggle navigation" onClick={() => { setChecked(true) }} />
                        <Text b color="inherit" hideIn="xs" onClick={() => navigate('/')}>
                            Positive Vibes
                        </Text>
                    </MobileItems>
                    <Text b color="inherit" hideIn="xs" onClick={() => navigate('/')}>
                        Positive Vibes
                    </Text>
                </Navbar.Brand>

                <Navbar.Content hideIn={"xs"} enableCursorHighlight>

                    <Navbar.Link onClick={() => navigate('/')} isActive={active === 'home'}>Headlines</Navbar.Link>
                    <Navbar.Link isActive={active === 'health'} onClick={() => navigate('/news/health')}>Health</Navbar.Link>
                    <Navbar.Link isActive={active === 'science'} onClick={() => navigate('/news/science')}>Science</Navbar.Link>
                    <Navbar.Link isActive={active === 'india'} onClick={() => navigate('/news/india')}>India</Navbar.Link>
                    <Navbar.Link isActive={active === 'technology'} onClick={() => navigate('/news/technology')}>Technology</Navbar.Link>
                    <Navbar.Link isActive={active === 'sports'} onClick={() => navigate('/news/sports')}>Sports</Navbar.Link>
                    <Navbar.Link isActive={active === 'entertainment'} onClick={() => navigate('/news/entertainment')}>Entertainment</Navbar.Link>
                </Navbar.Content>


                <MobileItems>
                    <Navbar.Content>
                        <Input
                            clearable
                            placeholder="Search..."
                        />
                    </Navbar.Content>
                </MobileItems>

                <DesktopItems>
                    <Navbar.Content>
                        {
                            loggedIn ? <ProfileDrop />
                                :
                                <>
                                    <Navbar.Link onClick={() => setLoginVisible(true)} color="inherit">
                                        Login
                                    </Navbar.Link>
                                    <Navbar.Item>
                                        <Button onPress={() => setRegisterVisible(true)} auto flat as={Link}>
                                            Sign Up
                                        </Button>
                                    </Navbar.Item>
                                </>

                        }
                    </Navbar.Content>
                </DesktopItems>
                <Navbar.Collapse>
                    <Navbar.CollapseItem><a style={white} href="/">Headlines</a></Navbar.CollapseItem>
                    <Navbar.CollapseItem><a style={white} href="/news/health">Health</a></Navbar.CollapseItem>
                    <Navbar.CollapseItem><a style={white} href="/news/science">Science</a></Navbar.CollapseItem>
                    <Navbar.CollapseItem><a style={white} href="/news/india">India</a></Navbar.CollapseItem>
                    <Navbar.CollapseItem><a style={white} href="/news/technology">Technology</a></Navbar.CollapseItem>
                    <Navbar.CollapseItem><a style={white} href="/news/sports">Sports</a></Navbar.CollapseItem>
                    <Navbar.CollapseItem><a style={white} href="/news/entertainment">Entertainment</a></Navbar.CollapseItem>
                    <Navbar.CollapseItem>
                        {
                            loggedIn ? 
                            <>
                            <Button icon={<FiSettings />} flat auto color={"secondary"}>Settings</Button>
                            <Button icon={<FiLogOut />} flat auto style={{ marginLeft: '10px' }} color={"error"}>Log Out</Button>
                            </>
                                :
                                <>
                                    <Button icon={<FiPlusCircle />} onPress={() => setRegisterVisible(true)} flat auto >Sign Up</Button>
                                    <Button icon={<FiLogIn />} onPress={() => setLoginVisible(true)} style={{ marginLeft: '10px' }} flat auto >Log In</Button>
                                </>
                        }
                    </Navbar.CollapseItem>

                </Navbar.Collapse>

            </Navbar>

            <Login />
            <Register />
        </div>
    )
}

const white = {
    color: 'white'
}
