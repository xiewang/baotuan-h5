import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import { withRouter } from 'react-router';
// import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import Entry from '../pages/entry';
import Login from '../pages/login';
import Detail from '../pages/detail';
import Audit from '../pages/audit';
import Setting from '../pages/setting';
import NoMatch from '../pages/failure/404';
import Error from '../pages/failure/500';
import AuthorizedRoute from './AuthorizedRoute';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { weChatSDKInit } from '../utils/common';
import './transition.css';
class XXTRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entryClass: 'home-base home-show'
        };
    }

    componentDidMount() {
        // weChatSDKInit();
    }

    _renderEntryChildren(props, Component) {
        const { match } = props;
        if (match) {
            this.state.entryClass = 'home-base home-show';
        } else {
            this.state.entryClass = 'home-base home-hide';
            setTimeout(() => {
                document.getElementsByClassName("home-base home-hide")[0] &&
                    document.getElementsByClassName("home-base home-hide")[0].setAttribute("class", 'home-base home-hide hide')
            }, 500)
        }
        return (
            <div className={this.state.entryClass}>
                <Component {...this.props} />
            </div>
        )
    }

    _renderAuditChildren(props, Component) {
        const { match } = props;
        if (match) {
            this.state.entryClass = 'home-base home-hide hide';
            setTimeout(() => {
                document.getElementsByClassName("home-base home-hide hide")[1] &&
                    document.getElementsByClassName("home-base home-hide hide")[1].setAttribute("class", 'home-base home-show');
                document.getElementsByClassName("transition-group")[0] &&
                    document.getElementsByClassName("transition-group")[0].setAttribute("class", 'transition-group hide');
            }, 500);
            if (props.history.action === 'POP') {
                setTimeout(() => {
                    document.getElementsByClassName("transition-group")[0] &&
                        document.getElementsByClassName("transition-group")[0].children[0] &&
                        document.getElementsByClassName("transition-group")[0].children[0].classList.add('hide');
                    document.getElementsByClassName("home-base home-hide hide")[1] &&
                        document.getElementsByClassName("home-base home-hide hide")[1].setAttribute("class", 'home-base home-show');
                }, 10);

            }
        } else {
            this.state.entryClass = 'home-base home-hide';
            document.getElementsByClassName("transition-group hide")[0] &&
                document.getElementsByClassName("transition-group hide")[0].setAttribute("class", 'transition-group');
            setTimeout(() => {
                document.getElementsByClassName("home-base home-hide")[1] &&
                    document.getElementsByClassName("home-base home-hide")[1].setAttribute("class", 'home-base home-hide hide');
            }, 500)
        }


        if (props.location.pathname === '/audit' || (localStorage.getItem('lastPath') === '/audit' &&
            props.location.pathname !== '/')) {
            localStorage.setItem('lastPath', props.location.pathname);
            return (
                <div className={this.state.entryClass}>
                    <Component {...this.props} />
                </div>
            );
        } else {
            localStorage.setItem('lastPath', props.location.pathname);
            return null;
        }

    }

    render() {
        const ANIMATION_MAP = {
            PUSH: 'forward',
            POP: 'back'
        }

        const Routes = withRouter(({ location, history }) => (
            <TransitionGroup className={'transition-group'}>
                <CSSTransition appear={true} key={location.key} timeout={1000} classNames={ANIMATION_MAP[history.action]}>
                    <Switch location={location}>
                        <Route path="/" exact children={() => <div />} />
                        <Route path="/detail/*" exact component={Detail} />
                        <Route path="/login" exact component={Login} />
                        <AuthorizedRoute path="/audit" exact component={Audit} />
                        <AuthorizedRoute path="/setting" exact component={Setting} />
                        <AuthorizedRoute path="/500" exact component={Error} />
                        <Route path="*">
                            <NoMatch />
                        </Route>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        ));
        return (
            <Router>
                <Route path="/" exact children={props => this._renderEntryChildren(props, Entry)} />

                <AuthorizedRoute path="/audit" exact children={props => this._renderAuditChildren(props, Audit)} />
                <Routes />
            </Router>
        );
    }
}

export default XXTRouter;
