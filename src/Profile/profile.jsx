import React from 'react';
import { Redirect } from 'react-router-dom';
import SettingsComponent from '../Settings/settings';

class ProfileComponent extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            user: '',
            toLogin: false
        }
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user) return this.setState({ toLogin: true })
        this.setState({user: user})
    }

    render() {
        if (this.state.toLogin === true) {
            return  <Redirect to="/login" />
        }
        return (
            <div>
                Hello, {this.state.user.name}

                <SettingsComponent />
            </div>
        )
    }
}

export default ProfileComponent