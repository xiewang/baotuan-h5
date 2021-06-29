import React, { Component } from 'react';
import styles from './styles.module.css';
import cns from 'classnames';
import request from '../../utils/request';
import { ListView } from 'antd-mobile';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: []
        };
    }

    componentDidMount() {
        this._getList();
    }

    _getList() {
        request({
            url:'/activity/getAll',
            method:'get'
        }).then((res) => {
            if (res.data.state === 'SUCCESS') {
                this.setState({
                    activities: res.data.data.content
                });
            } 
        });
    }
    
    render() {
       
        return (
          <div className={styles.container}>
            
            {
                this.state.activities.map(v=>{
                    return (
                        <div key={v.activityId}><span>活动：{v.activityName}</span></div>
                    )
                })
            }
            
          </div>
        );
      }
}


export default Home;
