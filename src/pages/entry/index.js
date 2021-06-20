import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { update } from '../../actions/session';
import styles from './styles.module.css';
import cns from 'classnames';
import { 
    TabBar,
    Icon
 } from 'antd-mobile';
import Header from '../../components/header';
import Home from '../home';
import My from '../my';
import Push from '../push';

class Entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 0
        };
    }

    componentDidMount() {
        this.props.update({});
    }

    renderContent(pageText) {
        return (
          <div style={styles.PageContainer}>
              {
                  pageText === 'home' ?(
                      <Home/>
                  ) : 
                  pageText === 'my' ?(
                      <My/>
                  ) : (
                    <Push/>
                  ) 
              }
          </div>
        );
      }
    
    render() {
       
        return (
          <div className={styles.container}>
            <Header/>
            <div className={styles.content}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="发现"
                        key="home"
                        icon={<Icon type="search" size={'md'} />
                        }
                        selectedIcon={<Icon type="search" size={'md'} />
                        }
                        selected={this.state.selectedTab === 0}
                        onPress={() => {
                        this.setState({
                            selectedTab: 0,
                        });
                        }}
                    >
                        {this.renderContent('home')}
                    </TabBar.Item>
                    <TabBar.Item
                        title="发布"
                        key="push"
                        icon={<Icon type="plus" size={'md'} />
                        }
                        selectedIcon={<Icon type="plus" size={'md'} />
                        }
                        selected={this.state.selectedTab === 1}
                        onPress={() => {
                        this.setState({
                            selectedTab: 1,
                        });
                        }}
                    >
                        {this.renderContent('push')}
                    </TabBar.Item>
                    <TabBar.Item
                        title="我的"
                        key="my"
                        icon={<Icon type="check-circle" size={'md'}/>
                        }
                        selectedIcon={<Icon type="check-circle" size={'md'} />
                        }
                        selected={this.state.selectedTab === 2}
                        onPress={() => {
                        this.setState({
                            selectedTab: 2,
                        });
                        }}
                    >
                        {this.renderContent('my')}
                    </TabBar.Item>
                
                </TabBar>
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

function mapDispatchToProps(dispatch, ownProps) {
    return bindActionCreators({
        update
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
