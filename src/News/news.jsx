import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import { Button, Grid, TextField } from '@material-ui/core';
import { Wrapper, Item, Date, Source, Topic, MobileButton, DesktopButton, MobileCenter } from '../Components/newsItem';
import { Footer, FooterText } from '../Components/footer'
import { Alert, Skeleton } from '@material-ui/lab';
import { motion } from 'framer-motion';
import '../fonts.css';

import FetchNews from '../services/fetchNews';
import CheckAuth from '../services/checkAuth';
import SessionService from '../services/session';

class NewsItemComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            news: null,
            present: false,
            login: false,
            user: null,
            searchValue: null,
            search: false,
            loginMessage: false
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.search = this.search.bind(this)
    }

    async componentDidMount() {
        const token = localStorage.getItem("token")
        let user = SessionService.getUser()

        if (user === null) {
            user = JSON.parse(localStorage.getItem("user"));
            CheckAuth.check(token).then(res => {
                this.setState({ user: user, loginMessage: false })
                SessionService.setUser(user)
            }).catch(e => {
                console.log(e)
                this.setState({ loginMessage: true })
            })
        } else {
            this.setState({user: user, loginMessage: false})
        }

        FetchNews.topStories(token).then(data => {
            this.setState({
                news: data.data.resl,
                present: true
            })
        }).catch(e => {
            FetchNews.topStories(token).then(data => {
                this.setState({
                    news: data.data.resl,
                    present: true
                })
            }).catch(e => {
                this.setState({
                    present: false,
                    login: true
                })
            })
        })

        // If initial request fails for some network issues, try one more time

    }

    search(event) {
        event.preventDefault();
        this.setState({
            search: true
        })
    }

    handleSearch(event) {
        this.setState({
            searchValue: event.target.value
        })
    }

    render() {
        const login = this.state.login;
        const present = this.state.present;
        const search = this.state.search;
        let items;
        let welcome;
        if (login) {
            return <Redirect to="/login" />
        }

        if (search) {
            return <Redirect push to={"/search/" + this.state.searchValue} />
        }

        if (!present) {
            items = <div>
                <NewsConstructor />
                <NewsConstructor />
                <NewsConstructor />
            </div>
        } else {
            items = this.state.news.map((item, key) => <NewsConstructor key={key} news={item} />);
        }
        if (this.state.user) {
            welcome = <motion.div className="logo" initial="hidden" animate="visible" variants={{
                hidden: {
                    scale: .8,
                    opacity: 0
                },
                visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                        delay: .2
                    }
                },
            }}>
                Welcome, {this.state.user.name}
            </motion.div>
        } else {
            welcome = <br />
        }
        if(this.state.loginMessage) {
            welcome = <LoginMessage />
        }
        return (
            <Wrapper className="roboto">
                <motion.div initial="hidden" animate="visible" variants={{
                    hidden: {
                        opacity: 0,
                        translateY: 150
                    },
                    visible: {
                        opacity: 1,
                        translateY: 0,
                        transition: {
                            delay: .02
                        }
                    }
                }}>
                    <MobileCenter>
                        <motion.div initial="hidden" animate="visible" variants={{
                            hidden: {
                                scale: .8,
                                opacity: 0
                            },
                            visible: {
                                scale: 1,
                                opacity: 1,
                                transition: {
                                    delay: .4,
                                }
                            },
                        }}>
                            {this.state.user ?
                                <form onSubmit={this.search} noValidate autoComplete="off">
                                    <TextField color="secondary" style={{ width: 80 + '%' }} onChange={this.handleSearch} label="Search" variant="outlined" />
                                </form>
                                : null
                            }
                        </motion.div>
                        <br />
                        {welcome} <br />
                    </MobileCenter>
                    <Topic className="handwriting">
                        Topstories
                </Topic>
                    {items}
                    <FooterComponent />
                </motion.div>
            </Wrapper>
        )
    }
}

export class NewsConstructor extends React.Component {

    render() {

        if (this.props.news) {
            return (
                <motion.div initial="hidden" animate="visible" variants={{
                    hidden: {
                        opacity: 0,
                        scale: .8,
                    },
                    visible: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                            delay: .1
                        }
                    }
                }}>
                    <Item>
                        <span className="logo">{this.props.news.title._text}</span>
                        <p></p>
                        <DesktopButton>
                            <Grid container>
                                <Grid item xs={10}>
                                    <Date>{this.props.news.pubDate._text}</Date>
                                    <Source>{this.props.news.source._text}</Source>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button href={this.props.news.link._text} target="_blank" variant="contained" color="secondary">
                                        Read Post
                                </Button>
                                </Grid>
                            </Grid>
                        </DesktopButton>

                        <MobileButton>
                            <Grid item>
                                <Date>{this.props.news.pubDate._text}</Date>
                                <Source>{this.props.news.source._text}</Source>
                            </Grid>
                            <Button href={this.props.news.link._text} target="_blank" variant="outlined" color="secondary">
                                Read Post
                            </Button>
                        </MobileButton>
                    </Item>
                </motion.div>
            )
        } else {
            return (<div>
                <br />
                <Skeleton animation="wave" variant="rect" width={100 + '%'} height={200} /> <br />
            </div>
            )
        }
    }
}

export class LoginMessage extends React.Component {
    render() {
        return (
            <motion.div initial="hidden" animate="visible" variants={{
                hidden: {
                    opacity: 0
                },
                visible: {
                    opacity: 1,
                    transition: {
                        delay: .4
                    }
                }
            }}>
                <Alert severity="error">
                    Please <Link to="/register">Sign Up</Link> or <Link to="/login">Login</Link> for the best experience. <br />
                </Alert>
            </motion.div>
        )
    }
}

export class FooterComponent extends React.Component {
    render() {
        return (
            <div>
                <Footer>
                    <FooterText>
                        <a style={{ textDecoration: 'none' }} href="https://github.com/ujjwal-kr/positive-vibes">&copy; ujjwal-kr</a>
                    </FooterText>
                </Footer>
            </div>
        )
    }
}

export default NewsItemComponent;