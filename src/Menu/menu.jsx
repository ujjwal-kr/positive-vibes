import React from 'react';
import { Wrapper, Item } from '../Components/menu';

class MenuComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    async componentDidMount() {
        const user = localStorage.getItem("user");
        if(user) {
            this.setState({
                user: user
            })
        }
    }

    render() {
        return (
            <Wrapper>
                
            </Wrapper>
        )
    }
}

export default MenuComponent