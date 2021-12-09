import React, { Component } from 'react';
import styles from './styles.module.css';
import cns from 'classnames';
import request from '../../utils/request';
import Header from "../../components/header/back";
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../utils/common';

class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      my: {}
    };
  }

  componentDidMount() {
  }

  _logout() {
    alert('确定要登出吗？')
    logout();
  }

  _updateMyPhone() {

  }

  render() {
    return (
      <div className={styles.container}>
        <Header title="设置" {...this.props} />
        <div className={styles.content}>
          <div className={styles.line} >
            <span>姓名</span>
            <span>{this.props.session.userInfo.name}</span>
          </div>
          <div className={styles.line} >
            <span>性别</span>
            <span>{this.props.session.userInfo.sex == 0 ? '男' : '女'}</span>
          </div>
          <div className={styles.line} onClick={() => this._updateMyPhone()}>
            <span>手机号</span>
            <span>{this.props.session.userInfo.phone}</span>
          </div>

          <div onClick={this._logout.bind(this)} className={styles.logout}>
            <span>登出</span>
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { session } = state;
  return {
    session
  };
}


export default connect(mapStateToProps)(withRouter(My));

