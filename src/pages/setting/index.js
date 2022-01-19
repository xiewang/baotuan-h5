import React, { Component } from 'react';
import styles from './styles.module.css';
import cns from 'classnames';
import request from '../../utils/request';
import Header from "../../components/header/back";
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../utils/common';
import {
  Toast,
  Dialog,
  Input
} from 'antd-mobile';
import { bindActionCreators } from 'redux';
import { update } from '../../actions/session';

class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      my: {},
      phone: this.props.session.userInfo.phone
    };
  }

  componentDidMount() {
  }

  _logout() {
    alert('确定要登出吗？')
    logout();
  }


  _showPhoneEditShadow(value) {
    this.setState({
      DialogVisible: value || !this.state.DialogVisible
    });
  }

  _updateMyPhone() {
    if (!this.state.phone || !(/^1(3|4|5|7|8|9|6)\d{9}$/i.test(this.state.phone))) {
      return Toast.show({
        icon: 'fail',
        content: '请填写正确的手机号码',
      });
    }
    let formData = new FormData();
    formData.append("phone", this.state.phone);
    request({
      method: 'post',
      url: '/user/updateInfo',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      if (res.data.state === 'SUCCESS') {
        Toast.clear();
        Toast.show({
          icon: 'success',
          content: '手机号设置成功',
        });
        this._showPhoneEditShadow(false);
        this.props.session.userInfo.phone = this.state.phone;
        this.props.update(this.props.session.userInfo); //更新store中user info
      }
      if (res.data.state === 'FAILED' && res.data.error.message === 'the phone has been registered') {
        Toast.show({
          icon: 'fail',
          content: '您的手机号已被注册，请换一个手机号',
        });
      }
    });
  }

  render() {
    const that = this;
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
          <div className={styles.line} onClick={() => this._showPhoneEditShadow()}>
            <span>手机号</span>
            <span>{this.props.session.userInfo.phone}</span>
          </div>

          <div onClick={this._logout.bind(this)} className={styles.logout}>
            <span>登出</span>
          </div>
        </div>
        <Dialog
          visible={this.state.DialogVisible}
          title="更新手机号码"
          content={<Input placeholder='请输入手机号'
            onChange={val => { that.setState({ phone: val }) }}
            value={this.state.phone}
            type="number"
            clearable
          />}
          closeOnAction={false}
          closeOnMaskClick={true}
          onClose={() => {
            this._showPhoneEditShadow(false)
          }}
          actions={[[
            {
              key: 'close',
              text: '取消',
              onClick: () => this._showPhoneEditShadow(false)
            },
            {
              key: 'sumbmit',
              text: '提交',
              bold: true,
              onClick: this._updateMyPhone.bind(this)
            }
          ]]}
        />
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

