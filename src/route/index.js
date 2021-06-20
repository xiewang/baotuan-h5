import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Entry from '../pages/entry';
import Login from '../pages/login';
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
                    <Switch>
                        <Route path="/" exact component={Entry}/>
                        <Route path="/Entry" exact component={Entry}/>
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default BDRouter;
