import React from 'react';
import axios from 'axios';
import URL from '../url';
import { Redirect } from 'react-router-dom';
import { Wrapper } from '../Components/newsItem';
import { NewsConstructor } from './news';

class SearchComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            news: [''],
            present: false,
            login: false,
            user: null,
            searchTerm: null
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
        this.setState({ searchTerm: params.query })
        await axios.get(URL + 'news/search/' + params.query, {
            headers: { 'authorization': token }
        }).then(data => {
            if(Object.keys(data.data.resl).length < 1) {
                this.setState({
                    present: true
                })
            } else {
                this.setState({
                    news: data.data.resl,
                    present: true
                });
            }
        }).catch(e => {
            this.setState({
                present: true
            });
        })
    }

    render() {
        const present = this.state.present;
        let login = this.state.login;
        let items;
        let searchTerm = this.state.searchTerm;
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
        return (
            <Wrapper>
                 <strong>Results for '{searchTerm}'</strong><br/>
                {items}
            </Wrapper>
        )
    }
}

export default SearchComponent;