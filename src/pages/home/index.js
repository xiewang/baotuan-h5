import React, { Component } from 'react';
import styles from './styles.module.css';
import cns from 'classnames';
import request from '../../utils/request';
import { ListView } from 'antd-mobile';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this._getList();
    }

    _getList() {
        return request({
            url:'/user/getAll',
            method:'get'
        }).then((res) => {
            if (res.data.state === 'SUCCESS') {
                console.log(res.data);
            } 
        });
    }
    
    render() {
       
        return (
          <div className={styles.container}>
            
            <span>主页</span>
            
          </div>
        );
      }
}


export default Home;
