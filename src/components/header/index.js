import React, { Component, } from 'react';

import styles from './styles.module.css';
import cns from 'classnames';
import { NavBar } from 'antd-mobile-v2';
import logo from '../../assets/logo.png';
import { SetOutline } from 'antd-mobile-icons'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rightComponent: null
        }

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.title === '我的') {
            const setting = (
                <div onClick={this._settingClick.bind(this)}><SetOutline color='var(--adm-color-primary)' fontSize={20} /> </div>
            )
            this.setState({
                rightComponent: setting
            });
        } else {
            this.setState({
                rightComponent: null
            });
        }
    }

    _settingClick() {
        this.props.history.push('/setting');
    }

    render() {

        return (
            <NavBar
                mode="light"
                icon={<img src={logo} alt={'来抱团呀'} className={styles.logo} />}
                rightContent={this.state.rightComponent}
            >{this.props.title || '来抱团呀'}</NavBar>
        )
    }
}



export default Header;
