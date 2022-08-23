import React from 'react';
import { Redirect } from 'react-router-dom';
import { Wrapper, MobileCenter } from '../Components/newsItem';
import { TextField } from '@material-ui/core';
import { NewsConstructor, FooterComponent } from './news';
import { motion } from 'framer-motion';

import CheckAuth from '../services/checkAuth';
import FetchNews from '../services/fetchNews';

class SearchComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            news: null,
            present: false,
            login: false,
            user: null,
            searchValue: null,
            search: false,
            searchTerm: null
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.search = this.search.bind(this)
    }

    async componentDidMount() {
        const token = localStorage.getItem("token")
        const user = JSON.parse(localStorage.getItem("user"));

        const { match: { params } } = this.props;
        this.setState({ searchTerm: params.query })

        CheckAuth.check(token).then(res => {
            this.setState({ user: user })
        }).catch(e => {
            this.setState({ login: true })
        })

        FetchNews.search(params.query, token).then(data => {
            if (Object.keys(data.data.resl).length < 1) {
                return
            } else {
                this.setState({ news: data.data.resl, present: true })
            }
        }).catch(e => { this.props.history.push('/') })
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
        const present = this.state.present;
        const search = this.state.search;
        let login = this.state.login;
        let items;
        let searchTerm = this.state.searchTerm;

        if (login) {
            return <Redirect to="/login" />
        }

        if (search) {
            return <Redirect push from={window.location} to={"/red/search/" + this.state.searchValue} />
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
                        {this.state.user ?
                            <form onSubmit={this.search} noValidate autoComplete="off">
                                <TextField color="secondary" style={{ width: 80 + '%' }} onChange={this.handleSearch} label="Search" variant="outlined" />
                            </form>
                            : null
                        }
                    </MobileCenter><br />
                    <strong>Results for '{searchTerm}'</strong><br /><br />
                    <br />
                    {items}
                    <FooterComponent />
                </motion.div>
            </Wrapper>
        )
    }
}

export default SearchComponent;