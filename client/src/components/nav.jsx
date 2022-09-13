import { Navbar, Button, Link, Text } from "@nextui-org/react";

export default function Nav() {
    return (
        <div>
            <Navbar variant="floating" isCompact isBordered>
                <Navbar.Brand>
                    <Text b color="inherit" hideIn="xs">
                        Positive Vives
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
                    <Navbar.Link color="inherit" href="#">
                        Login
                    </Navbar.Link>
                    <Navbar.Item>
                        <Button auto flat as={Link} href="#">
                            Sign Up
                        </Button>
                    </Navbar.Item>
                </Navbar.Content>
            </Navbar>
        </div>
    )
}