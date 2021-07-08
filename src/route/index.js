import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import Entry from '../pages/entry';
import Login from '../pages/login';
import Detail from '../pages/detail';
import NoMatch from '../pages/failure/404';

class BDRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <Router>
                <div>
                    <CacheSwitch>
                        <CacheRoute path="/" exact component={Entry}/>
                        <CacheRoute path="/entry" exact component={Entry}/>
                        <Route path="/detail" exact component={Detail}/>
                        <Route path="*">
                            <NoMatch />
                        </Route>
                    </CacheSwitch>
                </div>
            </Router>
        );
    }
}

export default BDRouter;
