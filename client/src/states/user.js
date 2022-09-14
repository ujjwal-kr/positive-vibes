import { atom } from "recoil";

export const userState = atom({
    key: 'user',
    default: {}
})

export const tokenState = atom({
    key: 'token',
    default: ''
})

export const loggedInState = atom({
    key: 'loggedin',
    default: false
})