import React from 'react';

class Redirect extends React.Component {
    componentDidMount() {
        const { match: { params } } = this.props;
        if (params.id) {
            return this.props.history.push('/news/'+params.id);
        }
    }

    render() {
        return (
            <div>
                REDIRECTING
            </div>
        )
    }
}

export default Redirect;