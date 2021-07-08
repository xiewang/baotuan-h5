import React, { Component,  } from 'react';

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
                icon={<img src={logo} alt={'香香树'} className={styles.logo}/>}
                rightContent={[
                <Icon key="1" type="ellipsis" />,
                ]}
            >香香树</NavBar>
        )
    }
}



export default Header;
