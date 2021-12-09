import React, { Component, } from 'react';

import styles from './styles.module.css';
import cns from 'classnames';
import { NavBar, Icon } from 'antd-mobile';
import missingImg from '../../assets/missing.jpg';
import moment from "moment";

class Header extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  _jumpToDetailPage(data) {
    this.props.history.push('/detail', data);
  }

  render() {
    const rowData = this.props.rowData;
    const rowID = this.props.rowID;
    if (rowData.picLink.indexOf('.com') < 0) {
      rowData.picLink = missingImg
    }
    return (
      <div key={rowID} className={styles.container}>
        <div className={styles.title}>{rowData.activityName}</div>
        <div className={styles.content}>
          <img className={styles.img} src={rowData.picLink} alt="" />
          <div className={styles.contentRight}>
            <div className={styles.description}>{rowData.description}</div>
            <div className={styles.time}>{moment(rowData.activityStartTime).format(
              "YYYY/MM/DD")}</div>
            <div className={styles.price}>
              <span>价格：{rowData.price}元</span>
              <span>抱团：{rowData.participation}/{rowData.volume}</span>
            </div>
            <div className={cns(styles.contentLine, styles.buttonLine)}>
              <div className={styles.button} onClick={() => this._jumpToDetailPage(rowData)}>
                {this.props.location.state && this.props.location.state === 'audit' ? (
                  <span>去审核</span>
                ) : (
                  <span>马上拼课</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
