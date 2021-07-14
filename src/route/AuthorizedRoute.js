import React, { Component } from 'react';
import { withRouter,  } from 'react-router';
import { Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import Login from '../pages/login';
import {getToken} from '../utils/auth';


class AuthorizedRoute extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentWillUnmount() {
    }


    render() {
        const { component: Home, ...rest } = this.props;
        const token = getToken();
        
        return (
            <Route {...rest} render={props => {
                    let page = null;
                    const Page = this.props.component;
                    if (token) {
                        page = <Page/>;
                    } else {
                        page = <Login {...props}/>
                    }
                    return page;
                }
            } />
        );
    }
}

function mapStateToProps(state) {
    const { session } = state;
    return {
        session
    };
}

export default connect(mapStateToProps)(withRouter(AuthorizedRoute));
