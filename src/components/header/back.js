import React, { Component } from 'react';

import styles from './styles.module.css';
import cns from 'classnames';
import { NavBar } from 'antd-mobile';
import { LeftOutline } from 'antd-mobile-icons'

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
    this.props.history.goBack();
  }

  render() {

    return (
      <NavBar
        style={{ backgroundColor: '#fff' }}
        mode="light"
        back="返回"
        backArrow={<LeftOutline />}
        onBack={() => this._leftClick()}
      >{this.props.title || ''}</NavBar>
    )
  }
}



export default Header;
