import React from 'react';

class Redirect extends React.Component {
    componentDidMount() {
        const { match: { params } } = this.props;
        if (params.id) {
            if(params.id !== 'search') {
                console.log(params.id)
                return this.props.history.push('/news/'+params.id);
            } else {
                return this.props.history.push(`/${params.id}/${params.two}`)
            }
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
