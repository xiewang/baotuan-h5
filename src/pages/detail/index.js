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
import { emitEvent, weChatMessageShare, weChatSDKInit } from '../../utils/common';

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
			activity: this.props.location.state || {},
			hasAudited: this.props.location.state && this.props.location.state.status === 0 ? false : true
		});
		this.state.activity = this.props.location.state;


		const activityId = window.location.pathname.replace("/detail/", "");
		this._getDetail(activityId).then(res => {
			if (res) {
				this._getRegisterStatus();
				this._getRegisterUsers();
				this._getPublisher(this.state.activity.userId);
				this._shareToWechat();
			}
		})
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
						content: 'ζΌε’ζε',
					});
					this.state.activity.participation++;
				} else {
					Toast.show({
						icon: 'success',
						content: 'εζΆζΌε’ζε',
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
						content: 'ζΌε’ε€±θ΄₯',
					});
				} else {
					Toast.show({
						icon: 'fail',
						content: 'εζΆζΌε’ε€±θ΄₯',
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
						content: 'ε?‘ζ Έι©³εοΌε·²δΈζΆ',
					});
				} else {
					Toast.show({
						icon: 'success',
						content: 'ιθΏε?‘ζ ΈοΌε·²δΈζΆ',
					});
				}
			} else {
				if (!this.state.hasAudited) {
					Toast.show({
						icon: 'success',
						content: 'ε?‘ζ Έι©³εοΌε·²δΈζΆ',
					});
				} else {
					Toast.show({
						icon: 'success',
						content: 'ιθΏε?‘ζ ΈοΌε·²δΈζΆ',
					});
				}
			}
			this.setState({
				auditing: false
			});
			emitEvent("auditFinished", {});
			emitEvent("pushSuccess", {});
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
				content: 'θ―·ε‘«εζ­£η‘?ηζζΊε·η ',
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
					content: 'ζζΊε·θ?Ύη½?ζε',
				});
				this._showPhoneEditShadow(false);
				this.props.session.userInfo.phone = this.state.phone;
				this.props.update(this.props.session.userInfo); //ζ΄ζ°storeδΈ­user info
			}
			if (res.data.state === 'FAILED' && res.data.error.message === 'the phone has been registered') {
				Toast.show({
					icon: 'fail',
					content: 'ζ¨ηζζΊε·ε·²θ’«ζ³¨εοΌθ―·ζ’δΈδΈͺζζΊε·',
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

	_shareToWechat() {
		weChatSDKInit().then(res => {
			if (res) {
				const params = {
					title: "ζ₯ζ±ε’-" + this.state.activity.activityName,
					desc: this.state.activity.description,
					link: window.location.href,
					imgUrl: this.state.activity.picLink,
				}
				weChatMessageShare(params);
			}
		});
	}

	_getDetail(activityId) {
		return new Promise((resolve, reject) => {
			request({
				method: 'get',
				url: '/activity/detail?activityId=' + activityId || this.state.activity.activityId,
			}).then((res) => {
				if (res.data.state === 'SUCCESS' && res.data.data) {
					this.setState({
						activity: res.data.data
					})
					return resolve(true);
				}
				return resolve(false);
			}, (error) => { resolve(false); });
		});

	}

	render() {
		const that = this;
		// if (!(this.state.activity && this.state.activity.activityId)) {
		// 	return (<div />);
		// }
		return (
			<div className={styles.container}>
				<Header title="ζ΄»ε¨θ―¦ζ" {...this.props} />
				<div className={styles.content}>
					<div className={styles.iamge}>
						<img alt={this.state.activity.picLink} src={this.state.activity.picLink} />
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<span>{this.state.activity.activityName}</span>
						</div>
						<div className={styles.title1}>
							<span>ζ΄»ε¨ζΆι΄οΌ</span><span>{moment(this.state.activity.activityStartTime).format(
								"YYYYεΉ΄MMζDDζ₯ HH:mm:ss")}</span>
						</div>
						<div className={styles.title1}>
							<span>ζ΄»ε¨ε°ηΉοΌ</span><span>{this.state.activity.place}</span>
						</div>
						<div className={styles.title1}>
							<span>θ΄Ήη¨οΌ</span><span>{this.state.activity.price}ε/ζ¬‘</span>
						</div>
						<div className={styles.title1}>
							<span>ζΌε’δΊΊζ°οΌ</span><span>{this.state.activity.volume}</span>
						</div>
						<div className={styles.title1}>
							<span>ε·²ζΌε’δΊΊζ°οΌ</span><span>{this.state.activity.participation}</span>
						</div>
						<div className={styles.title1}>
							<span>εεΈθοΌ</span><span>{this.state.publisherName}</span>
						</div>
						<div className={styles.title1}>
							<span>ζΌε’ζδΎζΉοΌ</span><span>{this.state.activity.providerName}</span>
						</div>
						<div className={styles.title1}>
							<span>ζΌε’θ―¦ζοΌ</span><span>{this.state.activity.description}</span>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<span>ζΌε’δΊΊε</span>
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
									<span>ζζ </span>
								)
							}
						</div>
					</div>

					<div className={styles.buttonLine}>
						{
							this.state.hasAudited && (
								this.state.hasRegister ? (
									<Button color='danger' style={{ marginRight: '10px' }} disabled={this.state.registering} onClick={() => this._register()}>
										<span>εζΆε’</span>
									</Button>
								) : (
									<Button color='success' style={{ marginRight: '10px' }} disabled={this.state.registering} onClick={() => this._register()}>
										<span>ι©¬δΈε’</span>
									</Button>
								)
							)

						}

						{
							this.props.session.userInfo.role === "0" && (

								!this.state.hasAudited ? (
									<Button color='success' disabled={this.state.auditing} onClick={() => this._audit()}>
										<span>ιθΏ</span>
									</Button>
								) : (
									<Button color='danger' disabled={this.state.auditing} onClick={() => this._audit()}>
										<span>δΈζΆ</span>
									</Button>
								)

							)
						}


					</div>

				</div>
				<Dialog
					visible={this.state.DialogVisible}
					title="θη³»ζΉεΌ"
					content={<Input placeholder='θ―·θΎε₯ζζΊε·'
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
							text: 'εζΆ',
							onClick: () => this._showPhoneEditShadow(false)
						},
						{
							key: 'submit',
							text: 'ζδΊ€',
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
