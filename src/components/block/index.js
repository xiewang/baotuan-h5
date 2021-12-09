import React, { Component, } from 'react';

import styles from './styles.module.css';

class Header extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div className={styles.title}><span>{this.props.title}</span></div>
                <div className={styles.content}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}



export default Header;
