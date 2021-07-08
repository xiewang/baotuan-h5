import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import { withRouter } from 'react-router';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import Entry from '../pages/entry';
import Login from '../pages/login';
import Detail from '../pages/detail';
import NoMatch from '../pages/failure/404';
import AuthorizedRoute from './AuthorizedRoute';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import './transition.css';
class XXTRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        const ANIMATION_MAP = {
            PUSH: 'forward',
            POP: 'back'
        }
        const renderChildren = (props, component) => {
            const { match } = props;
            return (
                <div  className={[match?'home-base home-show' :'home-base1 home-hide']}> 
                    {component}
                </div>
            )
          }
        const Routes = withRouter(({location, history}) => (
            <TransitionGroup className={'transition-group'}>
                
                <CSSTransition appear={true}  key={location.key} timeout={800} classNames={ANIMATION_MAP[history.action]}>
                <Switch  location={location}>
                    <Route path="/" exact children={()=><div/>}/>
                    <AuthorizedRoute path="/detail" exact component={Detail}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
                </CSSTransition>
            </TransitionGroup>
          ));
        return (
            <Router>
                <Route path="/" exact children={(props)=>renderChildren(props, <Entry/>)}/>
                <Routes/>
            </Router>
        );
    }
}

export default XXTRouter;
