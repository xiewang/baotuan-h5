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

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    componentDidMount() {
        // this.props.update({});
    }

    _back() {
        this.props.history.goBack();
    }

    _login() {
        request({
            method:'post',
            url:'/user/login?name='+this.state.username+'&password='+this.state.password,
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res.data.state === 'SUCCESS') {
                Toast.info('登录成功');
                this._back();
            } 
        });
    }

    render() {
        return (
            <div className={styles.container}>

                <div className={styles.close} onClick={()=>this._back()}>
                    <Icon type="cross" size={'lg'} />
                </div>
                <div className={styles.form}>
                    <InputItem
                        className={styles.formInput}
                        placeholder="用户名"
                        value={this.state.username}
                        onChange={val=>this.setState({username: val})}
                    >用户名</InputItem>
                    <InputItem
                        className={styles.formInput}
                        placeholder="密码"
                        type="password"
                        value={this.state.password}
                        onChange={val=>this.setState({password: val})}
                    >密码</InputItem>
                     <div className={styles.button}>
                        <Button onClick={()=>this._login()} type="primary">登录</Button>
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

function mapDispatchToProps(dispatch, ownProps) {
    return bindActionCreators({
        update
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
