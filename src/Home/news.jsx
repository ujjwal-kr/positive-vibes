import React from 'react';
import axios from 'axios';
import URL from '../url';

class NewsItemComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    async componentDidMount() {
        const token = localStorage.getItem("token")
        const {match: {params} } = this.props;
        if (params.id) {
            await axios.get(URL + 'news/' + params.id, {
                headers: {'authorization': token}
            })
            .then(data => {
                console.log(data.data);
            }).catch(e => {
                console.log(e);
            })
        } else {
            await axios.get(URL + 'news', {
                headers: {'authorization': token}
            }).then(data => {
                console.log(data.data)
            }).catch(e => {
                console.log(e)
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