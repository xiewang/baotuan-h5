import React, { Component } from 'react';
import styles from './styles.module.css';
import cns from 'classnames';
class Home extends Component {
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
            
            <span>主页</span>
            
          </div>
        );
      }
}


export default Home;
