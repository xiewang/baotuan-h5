import React, { Component } from 'react';
import styles from './styles.module.css';
import cns from 'classnames';
import request from '../../utils/request';
import { ListView } from 'antd-mobile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Activity from '../../components/activity';

class Home extends Component {
  constructor(props) {
    super(props);
    const activities = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      activities: activities,
      isLoading: true,
      location: '/'
    };
  }

  componentDidMount() {
    this._getList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.location.pathname !== this.state.location) {
      return false;
    }
    return true;

  }

  _getList() {
    request({
      url: '/activity/getAll',
      method: 'get'
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
      return (<Activity rowData={rowData} rowID={rowID} {...this.props} />)
    };
    return (
      <div className={styles.container}>
        <ListView
          ref={el => this.lv = el}
          initialListSize={15}
          pageSize={15}
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


