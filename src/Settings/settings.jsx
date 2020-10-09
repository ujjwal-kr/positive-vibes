import React from 'react';
import axios from 'axios';
import URL from '../url';

import { Button } from '@material-ui/core';
import { Wrapper, STitle, Caption } from '../Components/settings';

class SettingsComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            setting: '',
            basic: false,
            strict: false,
            moderate: false
        }
        this.changeSetting = this.changeSetting.bind(this)
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'))
        const token = localStorage.getItem('token')
        if (!token || !user) return this.props.history.push('/login');
        await axios.get(URL + 'auth/setting/' + user._id, {
            headers: { 'authorization': token }
        }).then(res => {
            this.setState({
                setting: res.data.setting
            })
            this.changeSettingVal(res.data.setting)
        }).catch(e => {
            console.log(e)
            return this.props.history.push('/login');
        })
    }

    async changeSetting(str) {
        const user = JSON.parse(localStorage.getItem('user'))
        const token = localStorage.getItem('token');
        await axios.patch(URL + 'auth/user/' + user._id, { setting: str }, {
            headers: { 'authorization': token }
        }).then(res => {
            this.setState({
                setting: str
            })
            this.changeSettingVal(str)
        }).catch(e => console.log(e))
    }

    changeSettingVal(str) {
        if (str === 'basic') return this.setState({ basic: true, moderate: false, strict: false })
        if (str === 'moderate') return this.setState({ moderate: true, basic: false, strict: false })
        if (str === 'strict') return this.setState({ strict: true, basic: false, moderate: false })
        return this.setState({ basic: true, moderate: false, strict: false })
    }


    render() {
        return (
            <Wrapper>
                <STitle>Basic Settings</STitle>
                <Caption>Filters the news with least effective algorithm.</Caption>
                <Button
                color="primary" 
                size="large" 
                variant={this.state.basic ? 'contained' : 'outlined'} 
                onClick={() => this.changeSetting('basic')}>BASIC</Button> <br />
                <br/>


                <STitle>Moderate Settings</STitle>
                <Caption>Recommended setting, filters the negative contents to a significant level</Caption>

                <Button 
                color="primary" 
                size="large"
                variant={this.state.moderate ? 'contained' : 'outlined'} 
                onClick={() => this.changeSetting('moderate')}>MODERATE</Button> <br />
                <br/>

                <STitle>Strict Settings</STitle>
                <Caption>Filters the news strictly, only the most positive news is possibly visible.</Caption>

                <Button 
                size="large" 
                color="primary" 
                variant={this.state.strict ? 'contained' : 'outlined'} 
                onClick={() => this.changeSetting('strict')}>Strict</Button>
            </Wrapper>
        )
    }
}

export default SettingsComponent;