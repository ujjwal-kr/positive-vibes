import { Dropdown } from "@nextui-org/react";

export default function ProfileDrop() {
    return (
        <Dropdown>
            <Dropdown.Button color={"gradient"} shadow >Profile</Dropdown.Button>
            <Dropdown.Menu aria-label="Static Actions">
                <Dropdown.Item key="new">News Settings</Dropdown.Item>
                <Dropdown.Item key="copy">Edit Profile</Dropdown.Item>
                <Dropdown.Item key="edit">About</Dropdown.Item>
                <Dropdown.Item key="delete" color="error">
                    Log Out
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}