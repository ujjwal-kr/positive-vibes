import { atom } from "recoil";

export const loggedInState = atom({
    key: 'loggedin',
    default: false
})

export const settingState = atom({
    key: 'setting-state',
    default: ''
})