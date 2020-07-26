import React from 'react';
import axios from 'axios';
import URL from '../url';

class SettingsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setting: ''
        }
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'))
        console.log(user)
        const token = localStorage.getItem('token');
        console.log(user._id)
        await axios.get(URL + 'auth/setting/' +user._id, {
            headers: { 'authorization': token}
        }).then(res => {
            console.log(res.data)
        }).catch(e => {
            console.log(e)
        })
    }

    render() {
        return (
            <div>
                SETTINGS
            </div>
        )
    }
}

export default SettingsComponent;