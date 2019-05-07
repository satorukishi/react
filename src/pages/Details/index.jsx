import React, { Component } from 'react';

class Details extends Component {
    constructor(props) {
        super(props);
        this.properties = props;
        console.log(this.props);
    }

    render() {
        return (
            <p>Details: { this.properties.match.params.id}</p>
        );
    }
}

export default Details;