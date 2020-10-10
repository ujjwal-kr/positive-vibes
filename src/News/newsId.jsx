import React from 'react';
import axios from 'axios';
import URL from '../url';
import { Redirect } from 'react-router-dom';
import { NewsConstructor, LoginMessage } from './news';

import { Wrapper, Topic, MobileCenter } from '../Components/newsItem';
import { motion } from 'framer-motion';

class NewsId extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            news: null,
            present: false,
            login: false,
            user: null,
            param: ''
        }
    }

    async componentDidMount() {
        const token = localStorage.getItem("token")
        const user = JSON.parse(localStorage.getItem("user"));
        axios.get(URL + 'auth/check', {
            headers: { 'authorization': token }
        }).then(res => {
            this.setState({
                user: user
            })
        }).catch(e => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        })
        const { match: { params } } = this.props;
        this.setState({param: params.id})
        await axios.get(URL + 'news/' + params.id, {
            headers: { 'authorization': token }
        }).then(data => {
            this.setState({
                news: data.data.resl,
                present: true
            });
        }).catch(e => {
            this.setState({
                login: true
            });
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
            welcome = <motion.div initial="hidden" animate="visible" variants={{
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
            welcome = <LoginMessage />
        }
        return (
            <Wrapper>
                <MobileCenter>
                    <strong>{welcome}</strong>
                </MobileCenter>
                <Topic className="handwriting">
                    <br/>
                    {this.state.param}
                </Topic>
                {items}
            </Wrapper>
        )
    }
}

export default NewsId;