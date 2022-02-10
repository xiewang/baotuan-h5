import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { update } from '../../actions/session';
import styles from './styles.module.css';
import {
    Input,
    Button,
    Toast
} from 'antd-mobile';
import { CloseOutline } from 'antd-mobile-icons'

import cns from 'classnames';
import request from '../../utils/request';
import { setToken } from '../../utils/auth';
import { weChatLogin, browser, getUrlParam } from '../../utils/common';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            isWechatLogin: true,
            code: ''
        };
    }

    componentDidMount() {
        // this.props.update({});
        if (browser.versions.isWechat && !this._getWeChatCode()) {
            weChatLogin(); //如果在微信中使用，登录页面直接跳转到微信授权页面
        } else if (browser.versions.isWechat && this._getWeChatCode()) {
            this._weCahtLogin(this._getWeChatCode()); // 拿到授权码
        } else {
            this.setState({
                isWechatLogin: false,
            });
        }
    }

    _back() {
        this.props.history.goBack();
    }

    _getWeChatCode() {
        const code = getUrlParam('code');
        if (code) {
            this.setState({
                isWechatLogin: true
            });
            return code;
        } else {
            return null;
        }
    }

    _weCahtLogin(code) {
        request({
            method: 'get',
            url: '/user/weChatLogin?code=' + code
        }).then((res) => {
            if (res.data.state === 'SUCCESS' && res.data.token) {
                setToken(res.data.token);
                Toast.show({
                    icon: 'success',
                    content: '登录成功',
                });
                setTimeout(() => {
                    window.location.replace('/');
                }, 1200);
            } else {
                Toast.show({
                    icon: 'fail',
                    content: '登录失败',
                });
                this.setState({
                    isWechatLogin: false
                });
            }
        });
    }

    _login() {
        request({
            method: 'post',
            url: '/user/login?phone=' + this.state.phone + '&password=' + this.state.password,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res.data.state === 'SUCCESS' && res.data.token) {
                setToken(res.data.token);
                Toast.show({
                    icon: 'success',
                    content: '登录成功',
                });
                this._back();
            } else {
                Toast.show({
                    icon: 'fail',
                    content: '登录失败',
                });
            }
        });
    }

    render() {
        return (
            <div className={styles.container}>

                <div className={styles.close} onClick={() => this._back()}>
                    <CloseOutline color='var(--adm-color-primary)' fontSize={20} />
                </div>
                {this.state.code}
                {
                    this.state.isWechatLogin ? (
                        <div><span>微信登录中...</span></div>
                    ) : (
                        <div className={styles.form}>
                            <Input
                                className={styles.formInput}
                                placeholder="手机号"
                                value={this.state.phone}
                                onChange={val => this.setState({ phone: val })}
                            >手机号</Input>
                            <Input
                                className={styles.formInput}
                                placeholder="密码"
                                type="password"
                                value={this.state.password}
                                onChange={val => this.setState({ password: val })}
                            >密码</Input>
                            <div className={styles.button}>
                                <Button onClick={() => this._login()} block color='primary' size='large'>登录</Button>
                            </div>
                        </div>
                    )
                }

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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
