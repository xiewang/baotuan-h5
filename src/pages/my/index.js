import React, { Component } from 'react';
import styles from './styles.module.css';
import cns from 'classnames';
import request from '../../utils/request';
import defaultPortrait from '../../assets/user.png';
import { 
  Icon,
  Toast
} from 'antd-mobile';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class My extends Component {
    constructor(props) {
        super(props);
        this.state = {
          my: {}
        };
    }

    componentDidMount() {
      this._getMyInfo();
    }

    _getMyInfo() {
      request({
          method:'get',
          url:'/user/myInfo'
      }).then((res) => {
          if (res.data.state === 'SUCCESS') {
            this.setState({
              my: res.data.data
            })
          } 
      });
    }

    _jumpToActivityListPage(type) {
      this.props.history.push('/audit', type);
    }
    
    render() {
       
        return (
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.portrait}>
                <img alt={this.state.my.name} src={this.state.my.portrait || defaultPortrait}/>
              </div>
              <div className={styles.username}>
                <span>{this.state.my.name}</span>
                <span className={styles.phone}>手机号:{this.state.my.phone}</span>
              </div>
             
            </div>
            <div className={styles.content}>
              <div className={styles.line} onClick={()=>this._jumpToActivityListPage('myPush')}>
                <span>我发布的课程</span>
                <Icon type="right" size={'md'} />
              </div>
              <div className={styles.line} onClick={()=>this._jumpToActivityListPage('myRegister')}>
                <span>我参与的课程</span>
                <Icon type="right" size={'md'} />
              </div>
              <div className={styles.line} onClick={()=>this._jumpToActivityListPage('audit')}>
                <span>需审核的课程</span>
                <Icon type="right" size={'md'} />
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

