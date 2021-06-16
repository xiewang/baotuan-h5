import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { update } from '../../actions/session';
import styles from './styles.module.css';
import cns from 'classnames';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.props.update({});
    }

    render() {
        return (
            <div className={styles.container}>
                <span className={cns(styles.red, styles.font)}>Hello, xiangxiangshu.</span>
                <br/>
                <div>
                    <Link to="/test">jump to test page</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
