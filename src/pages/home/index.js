import React, { Component } from 'react';
import styles from './styles.module.css';
import cns from 'classnames';
import request from '../../utils/request';
import { ListView } from 'antd-mobile';
import missingImg from '../../assets/missing.jpg';

class Home extends Component {
    constructor(props) {
        super(props);
        const activities = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            activities: activities,

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
                    activities: this.state.activities.cloneWithRows(res.data.data.content)
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

    _jumpToDetailPage () {

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
                        <div  className={styles.button} onClick={()=>this._jumpToDetailPage()}><span>马上拼课</span></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          };
        return (
          <div className={styles.container}>
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


export default Home;
