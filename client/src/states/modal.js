import { atom } from "recoil";

export const loginModal = atom({
    key: 'login-modal',
    default: false
})

export const registerModal = atom({
    key: 'register-modal',
    default: false
})

export const settingsModal = atom({
    key: 'settings-modal',
    default: false
})