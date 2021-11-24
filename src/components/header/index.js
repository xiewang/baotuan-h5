import React, { Component, } from 'react';

import styles from './styles.module.css';
import cns from 'classnames';
import { NavBar, Icon } from 'antd-mobile';
import logo from '../../assets/logo.png';

class Header extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {

        return (
            <NavBar
                mode="light"
                icon={<img src={logo} alt={'来抱团呀'} className={styles.logo} />}
                rightContent={[
                ]}
            >{this.props.title || '来抱团呀'}</NavBar>
        )
    }
}



export default Header;
