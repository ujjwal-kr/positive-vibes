import React from 'react';
import { Wrapper, ItemsWrapper, Item, ItemText, ProfileName } from '../Components/menu';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SettingIcon from '../assets/svg/settings-icon.svg';
import TopStories from '../assets/svg/topstories-icon.svg';
import Bookmarks from '../assets/svg/bookmark-icon.svg';
import Technology from '../assets/svg/tech-icon.png';
import Health from '../assets/svg/health-icon.svg';
import Science from '../assets/svg/science-icon.svg';
import Entertainment from '../assets/svg/entertainment-icon.svg';
import Sports from '../assets/svg/sports-icon.svg';

import { Button } from '@material-ui/core';
import { motion } from 'framer-motion';

import { LoginMessage, FooterComponent } from '../News/news';

import SessionService from '../services/session';

class MenuComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            alert: true
        }
        this.logout = this.logout.bind(this);
    }

    logout(e) {
        e.preventDefault();
        this.setState({
            user: null,
            alert: true
        })
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        SessionService.removeUser()
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            this.setState({ user: user, alert: false })
        } else {
            this.setState({ alert: true })
        }
    }

    render() {

        let alert = this.state.alert;

        return (
            <motion.div initial="hidden" animate="visible" variants={{
                hidden: {
                    opacity: 0,
                    translateY: 150
                },
                visible: {
                    opacity: 1,
                    translateY: 0,
                    transition: {
                        delay: .05
                    }
                }
            }}>
                <Wrapper>
                    <Grid container>
                        <Grid item xs={8}>
                            {alert ? <LoginMessage /> : <ProfileName>Welcome, {this.state.user.name}</ProfileName>}
                        </Grid>
                        <Grid item xs={4}>
                            <Link to="/settings">
                                <IconButton style={{ marginTop: '-10px' }} aria-label="delete">
                                    <img src={SettingIcon} width={40} height={40} alt="settings" />
                                </IconButton>
                            </Link>
                        </Grid>
                    </Grid>

                    {alert ? null : <span><br /><Button onClick={this.logout} variant="outlined" color="secondary">Logout</Button></span>}

                    <ItemsWrapper>
                        <ItemConstructor link="/" image={TopStories} text="TOPSTORIES" />
                        <ItemConstructor link="/" image={Bookmarks} text="BOOKMARKS" />
                        <hr />
                        <br />
                        <ItemConstructor link="/news/health" image={Health} text="HEALTH" />
                        <ItemConstructor link="/news/technology" image={Technology} text="TECHNOLOGY" />
                        <ItemConstructor link="/news/science" image={Science} text="SCIENCE" />
                        <ItemConstructor link="/news/sports" image={Sports} text="SPORTS" />
                        <ItemConstructor link="/news/india" image={TopStories} text="INDIA" />
                        <ItemConstructor link="/news/entertainment" image={Entertainment} text="ENTERTAINMENT" />
                    </ItemsWrapper>
                    <FooterComponent />
                </Wrapper>
            </motion.div>
        )
    }
}

class ItemConstructor extends React.Component {
    render() {
        return (
            <Item>
                <Link to={this.props.link} style={{ textDecoration: 'none' }}>
                    <Grid container>
                        <Grid item xs={1}>
                            <IconButton style={{ marginTop: '-20px' }} aria-label="delete">
                                <img src={this.props.image} width={40} height={40} alt="icon" />
                            </IconButton>
                        </Grid>
                        <Grid item xs={11}>
                            <ItemText>{this.props.text}</ItemText>
                        </Grid>
                    </Grid>
                </Link>
            </Item>
        )
    }
}

export default MenuComponent