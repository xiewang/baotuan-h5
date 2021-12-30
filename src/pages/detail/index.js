import React, { Component } from "react";
import styles from "./styles.module.css";
import cns from "classnames";
import request from "../../utils/request";
import Header from "../../components/header/back";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
	Toast,
	Button
} from 'antd-mobile';
import moment from "moment";
import { getToken } from "../../utils/auth";

class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activity: {},
			hasRegister: false,
			hasAudited: false,
			auditing: false,
			registering: false,
			activityUsers: []
		};
	}

	componentDidMount() {
		this.setState({
			activity: this.props.location.state,
			hasAudited: this.props.location.state.status === 0 ? false : true
		});
		this.state.activity = this.props.location.state;
		this._getRegisterStatus();
		this._getRegisterUsers();
	}

	_register() {
		this.setState({
			registering: true
		});
		request({
			method: 'post',
			url: '/activity/register?activityId=' + this.state.activity.activityId,
		}).then((res) => {
			if (res.data.state === 'SUCCESS') {

				this.setState({
					hasRegister: !this.state.hasRegister
				});
				if (this.state.hasRegister) {
					Toast.show({
						icon: 'success',
						content: '拼团成功',
					});
					this.state.activity.participation++;
				} else {
					Toast.show({
						icon: 'success',
						content: '取消拼团成功',
					});
					this.state.activity.participation--;
				}
				this._getRegisterUsers();
				this.setState({
					activity: this.state.activity
				})
			} else {
				if (this.state.hasRegister) {
					Toast.show({
						icon: 'fail',
						content: '拼团失败',
					});
				} else {
					Toast.show({
						icon: 'fail',
						content: '取消拼团失败',
					});
				}
			}
			this.setState({
				registering: false
			});
		});
	}

	_audit() {
		this.setState({
			auditing: true
		});
		request({
			method: 'post',
			url: '/activity/audit?activityId=' + this.state.activity.activityId,
		}).then((res) => {
			if (res.data.state === 'SUCCESS') {
				this.setState({
					hasAudited: !this.state.hasAudited
				});
				if (!this.state.hasAudited) {
					Toast.show({
						icon: 'success',
						content: '审核驳回，已下架',
					});
				} else {
					Toast.show({
						icon: 'success',
						content: '通过审核，已上架',
					});
				}
			} else {
				if (!this.state.hasAudited) {
					Toast.show({
						icon: 'success',
						content: '审核驳回，已下架',
					});
				} else {
					Toast.show({
						icon: 'success',
						content: '通过审核，已上架',
					});
				}
			}
			this.setState({
				auditing: false
			});
		});
	}



	_getRegisterStatus() {
		if (!getToken()) return;
		request({
			method: 'post',
			url: '/activity/registerStatus?activityId=' + this.state.activity.activityId,
		}).then((res) => {
			if (res.data.state === 'SUCCESS' && res.data.data) {
				this.setState({
					hasRegister: true
				})
			}
		});
	}

	_getRegisterUsers() {
		request({
			method: 'post',
			url: '/activity/users?activityId=' + this.state.activity.activityId,
		}).then((res) => {
			if (res.data.state === 'SUCCESS' && res.data.data) {
				this.setState({
					activityUsers: res.data.data.content
				})
			}
		});
	}

	render() {
		return (
			<div className={styles.container}>
				<Header title="活动详情" {...this.props} />
				<div className={styles.content}>
					<div className={styles.iamge}>
						<img alt={this.state.activity.name} src={this.state.activity.picLink} />
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<span>{this.state.activity.activityName}</span>
						</div>
						<div className={styles.title1}>
							<span>活动时间：</span><span>{moment(this.state.activity.activityStartTime).format(
								"YYYY年MM月DD日 HH:mm:ss")}</span>
						</div>
						<div className={styles.title1}>
							<span>活动地点：</span><span>{this.state.activity.place}</span>
						</div>
						<div className={styles.title1}>
							<span>费用：</span><span>{this.state.activity.price}元/次</span>
						</div>
						<div className={styles.title1}>
							<span>拼团人数：</span><span>{this.state.activity.volume}</span>
						</div>
						<div className={styles.title1}>
							<span>已拼团人数：</span><span>{this.state.activity.participation}</span>
						</div>
						<div className={styles.title1}>
							<span>发布者：</span><span>{this.state.activity.userId}</span>
						</div>
						<div className={styles.title1}>
							<span>拼团提供方：</span><span>{this.state.activity.providerName}</span>
						</div>
						<div className={styles.title1}>
							<span>拼团详情：</span><span>{this.state.activity.description}</span>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<span>拼团人员</span>
						</div>
						<div className={styles.users}>
							{
								this.state.activityUsers.map(v => {
									return (
										<span>{v.name}</span>
									)
								})
							}
							{
								this.state.activityUsers.length === 0 && (
									<span>暂无</span>
								)
							}
						</div>
					</div>

					<div className={styles.buttonLine}>
						{
							this.state.hasAudited && (
								this.state.hasRegister ? (
									<Button color='danger' style={{ marginRight: '10px' }} disabled={this.state.registering} onClick={() => this._register()}>
										<span>取消团</span>
									</Button>
								) : (
									<Button color='success' style={{ marginRight: '10px' }} disabled={this.state.registering} onClick={() => this._register()}>
										<span>马上团</span>
									</Button>
								)
							)

						}

						{
							this.props.session.userInfo.role === "0" && (

								!this.state.hasAudited ? (
									<Button color='success' disabled={this.state.auditing} onClick={() => this._audit()}>
										<span>通过</span>
									</Button>
								) : (
									<Button color='danger' disabled={this.state.auditing} onClick={() => this._audit()}>
										<span>下架</span>
									</Button>
								)

							)
						}


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
