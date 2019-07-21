import React, { Component } from 'react';
import '../css/Example.css';

class Example extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: "api call not done"
        };
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        fetch('/api/get-data')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    data: json.data
                });
            })
            .catch((error) => {
                console.log(error.message)
            });
    }

    render() {
        return (
            <div>
              {this.state.data}
            </div>
        );
    }
}

export default Example;
