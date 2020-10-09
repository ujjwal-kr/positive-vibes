import React from 'react';
import axios from 'axios';
import URL from '../url';
import { Redirect, Link } from 'react-router-dom';

import { Button, Grid, TextField } from '@material-ui/core';
import { Wrapper, Item, Date, Source, MobileButton, DesktopButton, MobileCenter } from '../Components/newsItem';
import { Alert, Skeleton } from '@material-ui/lab';
import '../fonts.css';

class NewsItemComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            news: null,
            present: false,
            login: false,
            user: null,
            searchValue: null,
            search: false
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.search = this.search.bind(this)
    }

    async componentDidMount() {
        const token = localStorage.getItem("token")
        const user = JSON.parse(localStorage.getItem("user"));
        await axios.get(URL + 'auth/check', {
            headers: { 'authorization': token }
        }).then(res => {
            this.setState({
                user: user
            })
        }).catch(e => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        })

        await axios.get(URL + 'news', {
            headers: { 'authorization': token }
        }).then(data => {
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
            welcome = `Welcome, ${this.state.user.name}`
        } else {
            welcome = <LoginMessage />
        }
        return (
            <Wrapper className="roboto">
                <MobileCenter>
                    {this.state.user ?
                        <form onSubmit={this.search} noValidate autoComplete="off">
                            <TextField style={{width: 80+'%'}} onChange={this.handleSearch} label="Search" variant="outlined" />
                        </form>
                        : null
                    }
                </MobileCenter>
                <br />
                {welcome} <br />
                {items}
            </Wrapper>
        )
    }
}

export class NewsConstructor extends React.Component {

    render() {

        if (this.props.news) {
            return (
                <Item>
                    {this.props.news.title._text}
                    <p></p>
                    <DesktopButton>
                        <Grid container>
                            <Grid item xs={10}>
                                <Date>{this.props.news.pubDate._text}</Date>
                                <Source>{this.props.news.source._text}</Source>
                            </Grid>
                            <Grid item xs={2}>
                                <Button href={this.props.news.link._text} target="_blank" variant="contained" color="primary">
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
                        <Button href={this.props.news.link._text} target="_blank" variant="outlined" color="primary">
                            Read Post
                            </Button>
                    </MobileButton>
                </Item>
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
            <Alert severity="info">
                Please <Link to="/register">SignUp</Link> or <Link to="/login">Login</Link> to change settings. <br />
            </Alert>
        )
    }
}

export default NewsItemComponent;