import React from 'react';
import HomeComponent from './News/home';
import {ThemeProvider} from '@material-ui/core';
import {createMuiTheme} from '@material-ui/core';

class App extends React.Component {
    render() {
        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#372549'
                },
                secondary: {
                    main: '#ff1c5c'
                }
            }
        })
        return (
            <ThemeProvider theme={theme}>
                <HomeComponent />
            </ThemeProvider>
        )
    }
}

export default App;