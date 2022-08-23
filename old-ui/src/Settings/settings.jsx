import React from 'react';

import { Button } from '@material-ui/core';
import { motion } from 'framer-motion';
import { Wrapper, STitle, Caption } from '../Components/settings';
import { FooterComponent } from '../News/news';

import SettingsService from '../services/settings';
import SessionService from '../services/session';

class SettingsComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            setting: '',
            basic: false,
            strict: false,
            moderate: false,
            user: {}
        }
        this.changeSetting = this.changeSetting.bind(this)
        this.logout = this.logout.bind(this)
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'))
        const token = localStorage.getItem('token')
        if (!token || !user) return this.props.history.push('/login');
        this.setState({ user: user })
        SettingsService.getUserSetting(token, user._id).then(res => {
            this.setState({
                setting: res.data.setting,
            })
            this.changeSettingVal(res.data.setting)
        }).catch(e => {
            SessionService.getUserSetting(token, user._id).then(res => {
                this.setState({
                    setting: res.data.setting,
                })
                this.changeSettingVal(res.data.setting)
            }).catch(e => {
                return this.props.history.push('/login');
            })        
        })
    }

    // If initial request fails for some network issues, try one more time

    changeSetting(str) {
        const user = JSON.parse(localStorage.getItem('user'))
        const token = localStorage.getItem('token');
        SettingsService.changeSetting(token, user._id, str).then(res => {
            this.setState({
                setting: str
            })
            this.changeSettingVal(str)
        }).catch(e => {
            SettingsService.changeSetting(token, user._id, str).then(res => {
                this.setState({
                    setting: str
                })
                this.changeSettingVal(str)
            }).catch(e => {
                return this.props.history.push('/login');
            })
        })
    }
    
    // If initial request fails for some network issues, try one more time

    changeSettingVal(str) {
        if (str === 'basic') return this.setState({ basic: true, moderate: false, strict: false })
        if (str === 'moderate') return this.setState({ moderate: true, basic: false, strict: false })
        if (str === 'strict') return this.setState({ strict: true, basic: false, moderate: false })
        return this.setState({ basic: true, moderate: false, strict: false })
    }

    logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        SessionService.removeUser()
        this.props.history.push('/')
    }


    render() {
        return (
            <motion.div initial="hidden" animate="visible" variants={{
                hidden: {
                    opacity: 0,
                    translateY: 100
                },
                visible: {
                    opacity: 1,
                    translateY: 0,
                    transition: {
                        delay: .2
                    }
                }
            }}>
                <Wrapper>

                    <STitle>SETTINGS</STitle>
                    {this.state.user.name ? <Caption>Welcome, <strong>{this.state.user.name}</strong>. As you can see, you can change your news settings here.</Caption> : null}
                    <Button onClick={this.logout} variant="outlined" color="secondary">Logout</Button>
                    <br />
                    <br />
                    <hr />
                    <STitle>Basic Settings</STitle>
                    <Caption>Filters the news with least effective algorithm.</Caption>
                    <Button
                        color="secondary"
                        size="large"
                        variant={this.state.basic ? 'contained' : 'outlined'}
                        onClick={() => this.changeSetting('basic')}>BASIC</Button> <br />
                    <br />


                    <STitle>Moderate Settings</STitle>
                    <Caption>Recommended setting, filters the negative contents to a significant level</Caption>

                    <Button
                        color="secondary"
                        size="large"
                        variant={this.state.moderate ? 'contained' : 'outlined'}
                        onClick={() => this.changeSetting('moderate')}>MODERATE</Button> <br />
                    <br />

                    <STitle>Strict Settings</STitle>
                    <Caption>Filters the news strictly, only the most positive news is possibly visible.</Caption>

                    <Button
                        size="large"
                        color="secondary"
                        variant={this.state.strict ? 'contained' : 'outlined'}
                        onClick={() => this.changeSetting('strict')}>Strict</Button>
                </Wrapper>
                <FooterComponent />
            </motion.div>
        )
    }
}

export default SettingsComponent;