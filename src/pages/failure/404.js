import React, { Component } from 'react';
import { ConfigProvider, ErrorBlock } from 'antd-mobile'

class NoMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <ConfigProvider>
                <ErrorBlock status='empty' />
            </ConfigProvider>
        );
    }
}

export default NoMatch;
