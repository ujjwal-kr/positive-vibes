import React from 'react';
import axios from 'axios';
import URL from '../url';
import { Redirect, Link } from 'react-router-dom';

import { Button, Grid } from '@material-ui/core';

import { Wrapper, Item, Date } from '../Components/newsItem';

class NewsId extends React.Component {

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
            items = 'Loading....'
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

class NewsConstructor extends React.Component {

    render() {
        return (
            <Item>
                {this.props.news.title._text}
                <p></p>
                <Grid container>
                    <Grid item xs={10}>
                        <Date>{this.props.news.pubDate._text}</Date>
                    </Grid>
                    <Grid item xs={2}>
                        <Button href={this.props.news.link._text} target="_blank" variant="contained" color="primary">
                            Read Post
                        </Button>
                    </Grid>
                </Grid>
            </Item>
        )
    }
}

class LoginMessage extends React.Component {
    render() {
        return(
            <strong>
                Please <Link to = "/register">SignUp</Link> or <Link to="/login">Login</Link> to tewak settings. <br />
            </strong>
        )
    }
}

export default NewsId;