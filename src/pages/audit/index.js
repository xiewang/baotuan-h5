import React, { Component } from 'react';
import styles from './styles.module.css';
import cns from 'classnames';
import request from '../../utils/request';
import { ListView } from 'antd-mobile';
import missingImg from '../../assets/missing.jpg';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from "../../components/header/back";

class Home extends Component {
    constructor(props) {
        super(props);
        const activities = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            activities: activities,
            isLoading: true,
            type: 'myPush',
            title: '我发布的课程'
        };
    }

    componentDidMount() {
      let title = '';
      if (this.props.location.state === 'myPush') {
        title = '我发布的课程';
      }
      if (this.props.location.state === 'myRegister') {
        title = '我参与的课程';
      }
      if (this.props.location.state === 'audit') {
        title = '需审核的课程';
      }
      this.state.type = this.props.location.state;
      this.setState({
        type: this.props.location.state,
        title: title
      });
      this._getList();
    }

    shouldComponentUpdate(nextProps, nextState) {
      return true;
    }

    _getList() {
      let url = '/activity/getAll';
      if (this.state.type === 'myPush') {
        url = '/activity/getMyAll';
      }
      if (this.state.type === 'myRegister') {
        url = '/activity/getMyAllRegister';
      }
      if (this.state.type === 'audit') {
        url = '/activity/getAllAudit';
      }
      request({
          url: url,
          method:'get'
      }).then((res) => {
          if (res.data.state === 'SUCCESS') {
              this.setState({
                  activities: this.state.activities.cloneWithRows(res.data.data.content),
                  isLoading: false
              });
          } 
      });
    }

    _onEndReached() {
        
    }

    _footer() {
        return (
            <div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? '加载中' : '到底了'}
            </div>
        );
    }

    _jumpToDetailPage (data) {
      this.props.history.push('/detail', data);
    }

    render() {
        const separator = (sectionID, rowID) => (
            <div
              key={`${sectionID}-${rowID}`}
              style={{
                backgroundColor: '#F5F5F5',
                height: 8,
              }}
            />
          );
        const row = (rowData, sectionID, rowID) => {
            if (rowData.picLink.indexOf('.com')<0) {
                rowData.picLink = missingImg
            }
            return (
              <div key={rowID} style={{ padding: '0 15px' }}>
                <div className={styles.title}>{rowData.activityName}</div>
                <div className={styles.content}>
                  <img className={styles.img} src={rowData.picLink  } alt="" />
                  <div className={styles.contentRight}>
                    <div className={styles.description}>{rowData.activityName}</div>
                    <div className={cns(styles.contentLine, styles.buttonLine)}>
                        <div className={styles.button} onClick={()=>this._jumpToDetailPage(rowData)}><span>马上拼课</span></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          };
        return (
          <div className={styles.container}>
            <Header title={this.state.title} {...this.props} />
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.activities}
                renderFooter={() => this._footer()}
                renderRow={row}
                renderSeparator={separator}
                className="am-list"
                useBodyScroll
                scrollRenderAheadDistance={500}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={10}
            />
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
export default connect(mapStateToProps)(withRouter(Home));


