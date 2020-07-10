import React from 'react';
import axios from 'axios';
import URL from '../url';

import { Button } from '@material-ui/core'

import { Wrapper, Item } from '../Components/newsItem';

class NewsItemComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            news: [''],
            present: false,
        }
    }

    async componentDidMount() {
        const token = localStorage.getItem("token")
        const { match: { params } } = this.props;
        if (params.id) {
            await axios.get(URL + 'news/' + params.id, {
                headers: { 'authorization': token }
            })
                .then(data => {
                    console.log(data.data);
                    this.setState({
                        news: data.data.resl,
                        present: true
                    });
                }).catch(e => {
                    console.log(e);
                })
        } else {
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
            })
        }
    }

    render() {
        const present = this.state.present;
        let items;

        if (!present) {
            items = 'Loadig....'
        } else {
            items = this.state.news.map((item, key) => <NewsConstructor news={item} />);
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
                <Button variant="contained" color="primary">
                    Read Post
                </Button>
            </Item>
        )
    }
}

export default NewsItemComponent;