import React, { Component } from 'react';

import styles from './styles.module.css';
import cns from 'classnames';
import { NavBar, Icon } from 'antd-mobile';

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
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => this._leftClick() }
            rightContent={[
              <Icon key="1" type="ellipsis" />,
            ]}
          >{this.props.title ||''}</NavBar>
        )
    }
}



export default Header;
