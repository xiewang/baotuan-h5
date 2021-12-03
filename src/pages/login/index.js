import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { update } from '../../actions/session';
import styles from './styles.module.css';
import {
    Icon,
    InputItem,
    Button,
    Toast
} from 'antd-mobile';
import cns from 'classnames';
import request from '../../utils/request';
import { setToken } from '../../utils/auth';
import { weChatLogin, browser, getUrlParam } from '../../utils/common';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isWechatLogin: false,
            code: ''
        };
    }

    componentDidMount() {
        // this.props.update({});

        if (browser.versions.isWechat && !this._getWeChatCode()) {
            weChatLogin(); //如果在微信中使用，登录页面直接跳转到微信授权页面
        } else if (browser.versions.isWechat && this._getWeChatCode()) {
            this._weCahtLogin(this._getWeChatCode()); // 拿到授权码
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
        }
        return null;
    }

    _weCahtLogin(code) {
        request({
            method: 'get',
            url: '/user/weChatLogin?code=' + code
        }).then((res) => {
            if (res.data.state === 'SUCCESS' && res.data.token) {
                setToken(res.data.token);
                Toast.info('登录成功');
                this._back();
            } else {
                Toast.info('登录失败');
                this.setState({
                    isWechatLogin: false
                });
            }
        });
    }

    _login() {
        request({
            method: 'post',
            url: '/user/login?name=' + this.state.username + '&password=' + this.state.password,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res.data.state === 'SUCCESS' && res.data.token) {
                setToken(res.data.token);
                Toast.info('登录成功');
                this._back();
            } else {
                Toast.info('登录失败');
            }
        });
    }

    render() {
        return (
            <div className={styles.container}>

                <div className={styles.close} onClick={() => this._back()}>
                    <Icon type="cross" size={'lg'} />
                </div>
                {this.state.code}
                {
                    this.state.isWechatLogin ? (
                        <div><span>微信登录中...</span></div>
                    ) : (
                        <div className={styles.form}>
                            <InputItem
                                className={styles.formInput}
                                placeholder="用户名"
                                value={this.state.username}
                                onChange={val => this.setState({ username: val })}
                            >用户名</InputItem>
                            <InputItem
                                className={styles.formInput}
                                placeholder="密码"
                                type="password"
                                value={this.state.password}
                                onChange={val => this.setState({ password: val })}
                            >密码</InputItem>
                            <div className={styles.button}>
                                <Button onClick={() => this._login()} type="primary">登录</Button>
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
