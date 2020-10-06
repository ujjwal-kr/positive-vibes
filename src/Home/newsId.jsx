import React from 'react';
import axios from 'axios';
import URL from '../url';
import { Redirect } from 'react-router-dom';
import { NewsConstructor, LoginMessage } from './news';

import { Wrapper } from '../Components/newsItem';

class NewsId extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            news: null,
            present: false,
            login: false,
            user: null
        }
    }

    async componentDidMount() {
        const token = localStorage.getItem("token")
        const user = JSON.parse(localStorage.getItem("user"));
        axios.get(URL+'auth/check', {
            headers: {'authorization': token}
        }).then(res => {
            this.setState({
                user: user
            })
        });
        const { match: { params } } = this.props;
        await axios.get(URL + 'news/' + params.id, {
            headers: { 'authorization': token }
        }).then(data => {
            console.log(data.data);
            this.setState({
                news: data.data.resl,
                present: true
            });
        }).catch(e => {
            console.log(e);
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
        if(login) {
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
        if(this.state.user) {
            welcome = `Welcome, ${this.state.user.name}`
        } else {
            welcome = <LoginMessage/>
        }
        return (
            <Wrapper>
                 <strong>{welcome}</strong><br/>
                {items}
            </Wrapper>
        )
    }
}

export default NewsId;