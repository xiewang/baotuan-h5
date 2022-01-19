import React, { Component } from 'react';
import styles from './styles.module.css';
import cns from 'classnames';
import request from '../../utils/request';
import defaultPortrait from '../../assets/user.png';
import {
  Toast
} from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { update } from '../../actions/session';

class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      my: {},
      publishNum: 0,
      registerNum: 0,
      auditNum: 0
    };
  }

  componentDidMount() {
    this._getMyInfo();
    this._getSummaryNum();
    window.addEventListener("pushSuccess", e => {
      this._getMyInfo();
      this._getSummaryNum();
    });
  }

  _getMyInfo() {
    request({
      method: 'get',
      url: '/user/myInfo'
    }).then((res) => {
      if (res.data.state === 'SUCCESS') {
        this.setState({
          my: res.data.data
        });
        this.props.update(res.data.data);
      }
    });
  }

  _jumpToActivityListPage(type) {
    this.props.history.push('/audit', type);
  }

  _getSummaryNum() {
    let url = '/activity/getMyAll';
    request({
      url: url,
      method: 'get'
    }).then((res) => {
      if (res.data.state === 'SUCCESS') {
        this.setState({
          publishNum: res.data.data.totalElements
        });
      }
    });

    url = '/activity/getMyAllRegister';
    request({
      url: url,
      method: 'get'
    }).then((res) => {
      if (res.data.state === 'SUCCESS') {
        this.setState({
          registerNum: res.data.data.totalElements
        });
      }
    });

    url = '/activity/getAllAudit';
    request({
      url: url,
      method: 'get'
    }).then((res) => {
      if (res.data.state === 'SUCCESS') {
        this.setState({
          auditNum: res.data.data.totalElements
        });
      }
    });
  }

  render() {

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.portrait}>
            <img alt={this.state.my.name} src={this.state.my.portrait || defaultPortrait} />
          </div>
          <div className={styles.username}>
            <span>{this.state.my.name}</span>
            <span className={styles.phone}>手机号:{this.state.my.phone}</span>
          </div>

        </div>
        <div className={styles.content}>
          <div className={styles.line} onClick={() => this._jumpToActivityListPage('myPush')}>
            <span>我发布的拼团</span>
            <div className={styles.num}><span>{this.state.publishNum}</span><RightOutline /></div>

          </div>
          <div className={styles.line} onClick={() => this._jumpToActivityListPage('myRegister')}>
            <span>我参与的拼团</span>
            <div className={styles.num}><span>{this.state.registerNum}</span><RightOutline /></div>

          </div>
          {
            this.state.my.role === "0" && (
              <div className={styles.line} onClick={() => this._jumpToActivityListPage('audit')}>

                <span>需审核的拼团</span>
                <div className={styles.num}><span>{this.state.auditNum}</span><RightOutline /></div>

              </div>
            )
          }

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

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({
    update
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(My));

