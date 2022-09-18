import { atom } from "recoil";

export const loggedInState = atom({
    key: 'loggedin',
    default: false
})