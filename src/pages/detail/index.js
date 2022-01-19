import React, { Component } from "react";
import styles from "./styles.module.css";
import cns from "classnames";
import request from "../../utils/request";
import Header from "../../components/header/back";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
	Toast,
	Button,
	Dialog,
	Input
} from 'antd-mobile';
import moment from "moment";
import { bindActionCreators } from 'redux';
import { getToken } from "../../utils/auth";
import { update } from '../../actions/session';

class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activity: {},
			hasRegister: false,
			hasAudited: false,
			auditing: false,
			registering: false,
			activityUsers: [],
			phone: this.props.session.userInfo.phone,
			DialogVisible: false,
			publisherName: ''
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
		this._getPublisher(this.state.activity.userId);
	}

	_register() {
		if (this.props.session.userInfo.phone == "") {
			this._showPhoneEditShadow();
		}
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

	_showPhoneEditShadow(value) {
		this.setState({
			DialogVisible: value || !this.state.DialogVisible
		});
	}

	_updatePhone() {
		if (!this.state.phone || !(/^1(3|4|5|7|8|9|6)\d{9}$/i.test(this.state.phone))) {
			return Toast.show({
				icon: 'fail',
				content: '请填写正确的手机号码',
			});
		}
		let formData = new FormData();
		formData.append("phone", this.state.phone);
		request({
			method: 'post',
			url: '/user/updateInfo',
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then((res) => {
			if (res.data.state === 'SUCCESS') {
				Toast.clear();
				Toast.show({
					icon: 'success',
					content: '手机号设置成功',
				});
				this._showPhoneEditShadow(false);
				this.props.session.userInfo.phone = this.state.phone;
				this.props.update(this.props.session.userInfo); //更新store中user info
			}
			if (res.data.state === 'FAILED' && res.data.error.message === 'the phone has been registered') {
				Toast.show({
					icon: 'fail',
					content: '您的手机号已被注册，请换一个手机号',
				});
			}
		});
	}

	_getPublisher(userId) {
		request({
			method: 'get',
			url: '/user/userInfo?userId=' + userId,
		}).then((res) => {
			if (res.data.state === 'SUCCESS' && res.data.data) {
				this.setState({
					publisherName: res.data.data.name
				})
			}
		});
	}

	render() {
		const that = this;
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
							<span>发布者：</span><span>{this.state.publisherName}</span>
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
										<span key={v.name}>{v.name}</span>
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
				<Dialog
					visible={this.state.DialogVisible}
					title="联系方式"
					content={<Input placeholder='请输入手机号'
						onChange={val => { that.setState({ phone: val }) }}
						value={this.state.phone}
						type="number"
						clearable
					/>}
					closeOnAction={false}
					closeOnMaskClick={true}
					onClose={() => {
						this._showPhoneEditShadow(false)
					}}
					actions={[[
						{
							key: 'close',
							text: '取消',
							onClick: () => this._showPhoneEditShadow(false)
						},
						{
							key: 'submit',
							text: '提交',
							bold: true,
							onClick: this._updatePhone.bind(this)
						}
					]]}
				/>
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
function mapDispatchToProps(dispatch, ownProps) {
	return bindActionCreators({
		update
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));
