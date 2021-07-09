import React, { Component } from 'react';
import styles from './styles.module.css';
import cns from 'classnames';
import request from '../../utils/request';
import Header from '../../components/header/back';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: {},

        };
    }

    componentDidMount() {
    }

    

    render() {
        
        return (
          <div className={styles.container}>
            <Header
              title="活动详情"
              {...this.props}
            />
            <span onClick={()=>{alert('s')}}>testxx</span>
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
export default connect(mapStateToProps)(withRouter(Detail));
