import React, { Component } from "react";
import styles from "./styles.module.css";
import cns from "classnames";
import request from "../../utils/request";
import Header from "../../components/header/back";
import { withRouter } from "react-router";
import { connect } from "react-redux";

class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activity: {},
		};
	}

	componentDidMount() {
		this.setState({
			activity: this.props.location.state,
		});
	}

	render() {
		return (
			<div className={styles.container}>
				<Header title="活动详情" {...this.props} />
				<div className={styles.content}>
					<div className={styles.iamge}>
						<img alt={this.state.activity.name} src={this.state.activity.picLink}/>
					</div>

				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { session } = state;
	return {
		session,
	};
}
export default connect(mapStateToProps)(withRouter(Detail));
