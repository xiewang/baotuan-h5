import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { update } from '../../actions/session';
import styles from './styles.module.css';
import {
    Space
} from 'antd-mobile';
import {
    TabBar
} from 'antd-mobile-v2';
import { SearchOutline, UploadOutline, UserOutline } from 'antd-mobile-icons'
import Header from '../../components/header';
import Home from '../home';
import My from '../my';
import Push from '../push';
import { getToken } from '../../utils/auth';
import { withRouter } from 'react-router';


class Entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 0,
            title: '来抱团呀'
        };
    }

    componentDidMount() {
        this.props.update({});
    }

    renderContent(pageText) {
        return (
            <div className={styles.pageContainer}>

                {
                    pageText === 'home' ? (
                        <Home />
                    ) :
                        pageText === 'my' ? (
                            <My />
                        ) : (
                            <Push />
                        )
                }
            </div>
        );
    }

    _switchTab(tab) {
        let title = '来抱团呀';
        if (tab === 0) {
            title = '来抱团呀';
        }
        if (tab === 1) {
            title = '发布活动';
        }
        if (tab === 2) {
            title = '我的';
        }
        if ((tab === 2 || tab === 1) && !getToken()) {
            this.props.history.push('/login');
            return;
        }
        this.setState({
            selectedTab: tab,
            title: title
        });
    }

    render() {

        return (
            <div className={styles.container}>
                <Header
                    title={this.state.title}
                    history={this.props.history}
                />
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
                            icon={<SearchOutline fontSize={22} />
                            }
                            selectedIcon={<SearchOutline fontSize={22} />
                            }
                            selected={this.state.selectedTab === 0}
                            onPress={() => this._switchTab(0)}
                        >
                            {this.renderContent('home')}
                        </TabBar.Item>
                        <TabBar.Item
                            style={{ fontSize: 13 }}
                            title="发布"
                            key="push"
                            icon={<UploadOutline fontSize={22} />
                            }
                            selectedIcon={<UploadOutline fontSize={22} />
                            }
                            selected={this.state.selectedTab === 1}
                            onPress={() => this._switchTab(1)}
                        >
                            {this.renderContent('push')}
                        </TabBar.Item>
                        <TabBar.Item
                            title="我的"
                            key="my"
                            icon={<UserOutline fontSize={22} />}
                            selectedIcon={<UserOutline fontSize={22} />}
                            selected={this.state.selectedTab === 2}
                            onPress={() => this._switchTab(2)}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Entry));
