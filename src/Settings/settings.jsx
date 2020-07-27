import React from 'react';
import axios from 'axios';
import URL from '../url';

class SettingsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setting: ''
        }
        this.changeSetting = this.changeSetting.bind(this);
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'))
        console.log(user)
        const token = localStorage.getItem('token');
        console.log(user._id)
        await axios.get(URL + 'auth/setting/' +user._id, {
            headers: { 'authorization': token}
        }).then(res => {
            this.setState({
                setting: res.data.setting
            })
        }).catch(e => {
            console.log(e)
        })
    }

     async changeSetting(str) {
        const user = JSON.parse(localStorage.getItem('user'))
        const token = localStorage.getItem('token');
        await axios.patch(URL+'auth/user/'+user._id, {setting: str}, {
            headers: {'authorization': token}
        }).then(res => {
            this.setState({
                setting: str
            })
            console.log(res)
        }).catch(e => console.log(e))
    }
    

    render() {
        return (
            <div>
                <button onClick={() => this.changeSetting('moderate')}>CHANGE</button>
            </div>
        )
    }
}

export default SettingsComponent;