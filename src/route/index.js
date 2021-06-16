import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Home from '../pages/home';
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
                        <Route path="/" exact component={Login}/>
                        <Route path="/home" exact component={Home}/>
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default BDRouter;
