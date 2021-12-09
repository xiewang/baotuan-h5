import React, { Component } from 'react';
import styles from './styles.module.css';
import cns from 'classnames';
import request from '../../utils/request';
import { List, PullToRefresh, InfiniteScroll, Empty } from 'antd-mobile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from "../../components/header/back";
import Activity from '../../components/activity';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      isLoading: true,
      type: 'myPush',
      title: '我发布的课程',
      hasMore: true,
      currentPage: 0
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

  _getList(page) {
    page = page || 0;
    const pageSize = 10;
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
    if (!this.state.hasMore) {
      return new Promise.resolve();
    }
    return request({
      url: url + '?size=' + pageSize + '&page=' + page,
      method: 'get'
    }).then((res) => {
      if (res.data.state === 'SUCCESS') {
        let hasMore = true;
        if (res.data.data.content.length < pageSize) {
          hasMore = false;
        }
        if (page === 0) {
          this.state.activities = [];
        }
        this.setState({
          activities: this.state.activities.concat(res.data.data.content),
          isLoading: false,
          hasMore: hasMore,
          currentPage: page
        });
      }
    });
  }

  render() {
    const statusRecord = {
      pulling: '用力拉...',
      canRelease: '松开吧...',
      refreshing: '玩命加载中...',
      complete: '加载完毕...',
    };

    const row = (rowData, rowID) => {
      return (<Activity rowData={rowData} rowID={rowID} {...this.props} />)
    };
    return (
      <div className={styles.container}>
        <Header title={this.state.title} {...this.props} />
        <div className={styles.content}>
          {
            !this.state.isLoading && this.state.activities.length === 0 ? (
              <Empty description='暂无数据' />
            ) : (
              <PullToRefresh
                onRefresh={() => this._getList()}
                renderText={status => {
                  return <div>{statusRecord[status]}</div>
                }}
              >
                <List>
                  {
                    this.state.activities.map((item, index) => (
                      <List.Item key={index}>{row(item, index)}</List.Item>
                    ))
                  }
                </List>
                <InfiniteScroll threshold={window.screen.height - 45} loadMore={() => this._getList(this.state.currentPage + 1)} hasMore={this.state.hasMore} />
              </PullToRefresh>
            )
          }
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
export default connect(mapStateToProps)(withRouter(Home));


