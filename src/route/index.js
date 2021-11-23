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
import NoMatch from '../pages/failure/404';
import AuthorizedRoute from './AuthorizedRoute';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
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
        weChatSDKInit();
    }

    _renderEntryChildren(props) {
        const { match } = props;
        if (match) {
            this.state.entryClass = 'home-base home-show';
        } else {
            this.state.entryClass = 'home-base home-hide';
            setTimeout(()=>{
                document.getElementsByClassName("home-base home-hide")[0].setAttribute("class", 'home-base home-hide hide')
            }, 500)
        }
        return (
            <div  className={this.state.entryClass}> 
                <Entry {...this.props}/>
            </div>
        )
    }

    render() {
        const ANIMATION_MAP = {
            PUSH: 'forward',
            POP: 'back'
        }

        const Routes = withRouter(({location, history}) => (
            <TransitionGroup className={'transition-group'}>
                <CSSTransition appear={true}  key={location.key} timeout={800} classNames={ANIMATION_MAP[history.action]}>
                <Switch  location={location}>
                    <Route path="/" exact children={()=><div/>}/>
                    <Route path="/detail" exact component={Detail}/>
                    <Route path="/login" exact component={Login}/>
                    <AuthorizedRoute path="/audit" exact component={Audit}/>
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
                </CSSTransition>
            </TransitionGroup>
          ));
        return (
            <Router>
                <Route path="/" exact children={props=>this._renderEntryChildren(props)}/>
                <Routes/>
            </Router>
        );
    }
}

export default XXTRouter;
