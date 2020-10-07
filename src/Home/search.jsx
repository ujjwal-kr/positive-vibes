import React from 'react';
import axios from 'axios';
import URL from '../url';
import { Redirect } from 'react-router-dom';
import { Wrapper } from '../Components/newsItem';
import { NewsConstructor, LoginMessage } from './news';

class SearchComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            news: [''],
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
        }).catch(e => {
            this.setState({
                login: true
            })
        })
        const { match: { params } } = this.props;
        await axios.get(URL + 'news/search/' + params.query, {
            headers: { 'authorization': token }
        }).then(data => {
            if(Object.keys(data.data.resl).length < 1) {
                this.setState({
                    news: null,
                    present: false
                })
            } else {
                this.setState({
                    news: data.data.resl,
                    present: true
                });
            }
        }).catch(e => {
            console.log(e);
            this.setState({
                present: true
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

export default SearchComponent;