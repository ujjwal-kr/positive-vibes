import React from 'react';
import axios from 'axios';
import URL from '../url';
import Redirect from 'react-router-dom/Redirect';

import { Button, Grid } from '@material-ui/core';
import { Wrapper, Item, Date } from '../Components/newsItem';

class NewsItemComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            news: [''],
            present: false,
            login: false,
        }
    }

    async componentDidMount() {
        const token = localStorage.getItem("token")
        await axios.get(URL + 'news', {
            headers: { 'authorization': token }
        }).then(data => {
            console.log(data.data)
            this.setState({
                news: data.data.resl,
                present: true
            })
        }).catch(e => {
            console.log(e)
            this.setState({
                present: false,
                login: true
            })
        })
    }

    render() {
        const login = this.state.login;
        const present = this.state.present;
        let items;
        if(login) {
            return <Redirect to="/login" />
        }

        if (!present) {
            items = 'Loading....'
        } else {
            items = this.state.news.map((item, key) => <NewsConstructor key={key} news={item} />);
        }
        return (
            <Wrapper>
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

export default NewsItemComponent;