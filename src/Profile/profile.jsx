import React from 'react';
import { Redirect } from 'react-router-dom';
import SettingsComponent from '../Settings/settings';
import axios from 'axios';
import URL from '../url';

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
        const token = localStorage.getItem("token")
        axios.get(URL+'auth/check', {
            headers: {'authorization': token}
        }).then(res => {
            this.setState({user: user})
        }).catch(e => {
            this.setState({
                toLogin: true
            })
        })
        
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