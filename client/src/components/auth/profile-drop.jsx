import { Dropdown } from "@nextui-org/react";
import { FiSettings, FiEdit, FiInfo, FiLogOut } from "react-icons/fi"
import { useRecoilState } from "recoil";
import StorageService from "../../services/storage.service";
import { settingsModal } from "../../states/modal";

import { loggedInState } from "../../states/user";

export default function ProfileDrop() {

    let [loggedIn, setLoggedIn] = useRecoilState(loggedInState)
    let [settingsVisible, setSettingsVisible] = useRecoilState(settingsModal)

    function logout() {
        console.log("logout")
        StorageService.removeToken()
        StorageService.removeUser()
        setLoggedIn(false)
    }

    return (
        <Dropdown>
            <Dropdown.Button color={"gradient"} shadow >Profile</Dropdown.Button>
            <Dropdown.Menu aria-label="Static Actions">
                <Dropdown.Item icon={<FiSettings color="#5966e7" />} key="new">
                  <p onClick={() => setSettingsVisible(true)}> News Settings </p>
                </Dropdown.Item>
                <Dropdown.Item icon={<FiEdit color="#5966e7" />} key="edit">Edit Profile</Dropdown.Item>
                <Dropdown.Item icon={<FiInfo color="#5966e7" />} key="about">About</Dropdown.Item>
                <Dropdown.Item icon={<FiLogOut color="#f4256d" />} key="logout" color="error">
                    <p onClick={logout}>Log Out</p>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}