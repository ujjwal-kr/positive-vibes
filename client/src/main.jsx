import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MantineProvider } from '@mantine/core'
import { RecoilRoot } from "recoil"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles>
        <App />
      </MantineProvider>
    </RecoilRoot>
  </React.StrictMode>
)