import React, { Component } from 'react';
import styles from './styles.module.css';
import cns from 'classnames';
import request from '../../utils/request';
import { List, PullToRefresh, InfiniteScroll, Empty } from 'antd-mobile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Activity from '../../components/activity';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      isLoading: true,
      location: '/',
      hasMore: true,
      currentPage: 0
    };
  }

  componentDidMount() {
    this._getList();
    window.addEventListener("pushSuccess", e => {
      this._getList();
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.location.pathname !== this.state.location) {
      return false;
    }
    return true;

  }

  _getList(page) {
    page = page || 0;
    const pageSize = 10;
    return request({
      url: '/activity/getAll?size=' + pageSize + '&page=' + page,
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
              <InfiniteScroll threshold={window.screen.height - 45 - 50} loadMore={() => this._getList(this.state.currentPage + 1)} hasMore={this.state.hasMore} />
            </PullToRefresh>
          )
        }

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


