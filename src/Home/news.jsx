import React from 'react';
import axios from 'axios';
import URL from '../url';

class NewsItemComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            token: ''
        }
    }

    async componentDidMount() {
        const token = JSON.parse(localStorage.getItem("token"));
        this.setState({ token: token });
        const {match: {params} } = this.props;
        if (params.id) {
            await axios.get(URL + 'news/' + params.id, {
                headers: {'autorization': this.state.token}
            })
            .then(data => {
                console.log(data.data);
            }).catch(e => {
                console.log(e);
            })
        }

        if (!params.id) {
            await axios.get(URL + 'news/' + params.id)
            .then(data => {
                console.log(data.data);
            }).catch(e => {
                console.log(e);
            })
        }
    }

    render() {
        return (
            <div>
                NEWWS
            </div>
        )
    }
}

class NewsConstructor extends React.Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default NewsItemComponent;