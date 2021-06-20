import React, { Component } from 'react';
import styles from './styles.module.css';
import cns from 'classnames';
class My extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }
    
    render() {
       
        return (
          <div className={styles.container}>
            
            <span>我的</span>
            
          </div>
        );
      }
}


export default My;
