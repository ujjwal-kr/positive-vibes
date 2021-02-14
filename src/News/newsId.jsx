import React from 'react';
import { Redirect } from 'react-router-dom';
import { NewsConstructor, LoginMessage, FooterComponent } from './news';

import { Wrapper, Topic, MobileCenter } from '../Components/newsItem';
import { motion } from 'framer-motion';

import CheckAuth from '../services/checkAuth';
import FetchNews from '../services/fetchNews';
import SessionService from '../services/session';

class NewsId extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            news: null,
            present: false,
            login: false,
            user: null,
            param: '',
            loginMessage: false
        }
    }

    componentDidMount() {
        const token = localStorage.getItem("token")
        // const user = JSON.parse(localStorage.getItem("user"));
        let user = SessionService.getUser()

        if (user === null) {
            user = JSON.parse(localStorage.getItem("user"));
            CheckAuth.check(token).then(res => {
                this.setState({ user: user, loginMessage: false })
            }).catch(e => {
                console.log(e)
                this.setState({loginMessage: true})
            })
        } else {
            this.setState({user: user, loginMessage: false})
        }


        const { match: { params } } = this.props;
        this.setState({ param: params.id })
        FetchNews.fetchWithId(params.id, token).then(data => {
            this.setState({
                news: data.data.resl,
                present: true
            })
        }).catch(e => {
            this.setState({ login: true })
        })
    }

    render() {
        const present = this.state.present;
        let login = this.state.login;
        let items;
        let welcome;
        if (login) {
            return <Redirect to="/login" />
        }
        if (!present) {
            items = <div>
                <NewsConstructor />
                <NewsConstructor />
                <NewsConstructor />
            </div>
        } else {
            items = this.state.news.map((item, key) => <NewsConstructor news={item} />);
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
        if (this.state.loginMessage) {
            welcome = <LoginMessage />
        }
        return (
            <Wrapper>
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
                        <strong>{welcome}</strong>
                    </MobileCenter>
                    <Topic className="handwriting">
                        <br />
                        {this.state.param}
                    </Topic>
                    {items}
                    <FooterComponent />
                </motion.div>
            </Wrapper>
        )
    }
}

export default NewsId;