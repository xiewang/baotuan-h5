import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { update } from '../../actions/session';
import styles from './styles.module.css';
import {
    TabBar,
    Icon,
    WhiteSpace
} from 'antd-mobile';
import Header from '../../components/header';
import Home from '../home';
import My from '../my';
import Push from '../push';
import { getToken } from '../../utils/auth';
import { withRouter } from 'react-router';

const userIcon = <svg t="1626360241457" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3752" xmlnsXlink="http://www.w3.org/1999/xlink" width="24" height="24"><defs><style type="text/css"></style></defs><path d="M517.632 552.149333c-108.714667 0-197.162667-85.546667-197.162667-190.72 0-38.314667 11.690667-75.306667 33.877334-106.922666C391.04 202.026667 452.138667 170.666667 517.632 170.666667c65.408 0 126.464 31.274667 163.2 83.712 7.765333 11.093333 14.250667 22.869333 19.413333 35.072a21.333333 21.333333 0 1 1-39.338666 16.64 147.285333 147.285333 0 0 0-15.018667-27.221334C617.130667 237.824 569.173333 213.333333 517.632 213.333333c-51.626667 0-99.584 24.533333-128.426667 65.621334a143.445333 143.445333 0 0 0-26.069333 82.432c0 81.664 69.290667 148.096 154.453333 148.096 63.402667 0 119.722667-36.437333 143.36-92.8a21.333333 21.333333 0 0 1 39.338667 16.512c-30.378667 72.277333-102.016 118.954667-182.656 118.954666" p-id="3753" fill="#949494"></path><path d="M303.829333 627.456c-49.92 0-90.453333 41.088-90.453333 91.605333C213.333333 769.578667 253.866667 810.666667 303.786667 810.666667h416.341333C770.133333 810.666667 810.666667 769.578667 810.666667 719.061333c0-50.517333-40.533333-91.605333-90.453334-91.605333H303.786667zM720.213333 853.333333H303.829333C230.442667 853.333333 170.709333 793.088 170.709333 719.061333 170.666667 645.034667 230.4 584.789333 303.786667 584.789333h416.341333C793.6 584.789333 853.333333 645.034667 853.333333 719.061333 853.333333 793.088 793.6 853.333333 720.213333 853.333333z" p-id="3754" fill="#949494"></path></svg>;
const userIconSelected = <svg t="1626360241457" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3752" xmlnsXlink="http://www.w3.org/1999/xlink" width="24" height="24"><defs><style type="text/css"></style></defs><path d="M517.632 552.149333c-108.714667 0-197.162667-85.546667-197.162667-190.72 0-38.314667 11.690667-75.306667 33.877334-106.922666C391.04 202.026667 452.138667 170.666667 517.632 170.666667c65.408 0 126.464 31.274667 163.2 83.712 7.765333 11.093333 14.250667 22.869333 19.413333 35.072a21.333333 21.333333 0 1 1-39.338666 16.64 147.285333 147.285333 0 0 0-15.018667-27.221334C617.130667 237.824 569.173333 213.333333 517.632 213.333333c-51.626667 0-99.584 24.533333-128.426667 65.621334a143.445333 143.445333 0 0 0-26.069333 82.432c0 81.664 69.290667 148.096 154.453333 148.096 63.402667 0 119.722667-36.437333 143.36-92.8a21.333333 21.333333 0 0 1 39.338667 16.512c-30.378667 72.277333-102.016 118.954667-182.656 118.954666" p-id="3753" fill="#33a3f4"></path><path d="M303.829333 627.456c-49.92 0-90.453333 41.088-90.453333 91.605333C213.333333 769.578667 253.866667 810.666667 303.786667 810.666667h416.341333C770.133333 810.666667 810.666667 769.578667 810.666667 719.061333c0-50.517333-40.533333-91.605333-90.453334-91.605333H303.786667zM720.213333 853.333333H303.829333C230.442667 853.333333 170.709333 793.088 170.709333 719.061333 170.666667 645.034667 230.4 584.789333 303.786667 584.789333h416.341333C793.6 584.789333 853.333333 645.034667 853.333333 719.061333 853.333333 793.088 793.6 853.333333 720.213333 853.333333z" p-id="3754" fill="#33a3f4"></path></svg>;

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
                <WhiteSpace size="md"></WhiteSpace>
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
            title = '发布';
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
                            icon={<Icon type="search" size={'md'} />
                            }
                            selectedIcon={<Icon type="search" size={'md'} />
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
                            icon={<Icon type="plus" size={'md'} />
                            }
                            selectedIcon={<Icon type="plus" size={'md'} />
                            }
                            selected={this.state.selectedTab === 1}
                            onPress={() => this._switchTab(1)}
                        >
                            {this.renderContent('push')}
                        </TabBar.Item>
                        <TabBar.Item
                            title="我的"
                            key="my"
                            icon={userIcon}
                            selectedIcon={userIconSelected}
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
