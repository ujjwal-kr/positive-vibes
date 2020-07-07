import React from 'react';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path = "/" component= {Home} />
                </Switch>
            </div>
        )
    }
}

export default App;