import React, { Component } from 'react';

import styles from './styles.module.css';
import cns from 'classnames';
import { NavBar } from 'antd-mobile';
import { LeftOutline } from 'antd-mobile-icons'
import { getUrlParam } from '../../utils/common';

class Header extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  _leftClick() {
    if (this.props.onLeftClick) {
      this.props.onLeftClick();
      return;
    }
    // const isShare = getUrlParam('share');
    if (this.props.history.length === 1) {
      this.props.history.push('/');
    } else {
      this.props.history.goBack();
    }
  }

  render() {

    return (
      <div className={styles.nav}>
        <NavBar
          mode="light"
          back="返回"
          backArrow={<LeftOutline />}
          onBack={() => this._leftClick()}
        >{this.props.title || ''}</NavBar>
      </div>
    )
  }
}



export default Header;
