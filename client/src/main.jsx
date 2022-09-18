import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { NextUIProvider } from '@nextui-org/react'
import { createTheme } from "@nextui-org/react"
import { RecoilRoot } from "recoil"

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      background: '#0d0d0d'
    }
  }
});


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RecoilRoot>
      <NextUIProvider theme={darkTheme}>
        <App />
      </NextUIProvider>
    </RecoilRoot>
  // </React.StrictMode>
)