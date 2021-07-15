import React, { Component } from "react";
import styles from "./styles.module.css";
import cns from "classnames";
import request from "../../utils/request";
import Header from "../../components/header/back";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { 
    Toast
 } from 'antd-mobile';
class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activity: {},
			hasRegister: false,
			activityUsers: [
				{
					name: 'test'
				}
			]
		};
	}

	componentDidMount() {
		this.setState({
			activity: this.props.location.state,
		});
		this.state.activity = this.props.location.state;
		this._getRegisterStatus();
		this._getRegisterUsers();
	}

	_register() {
		request({
            method:'post',
            url:'/activity/register?activityId='+this.state.activity.activityId,
        }).then((res) => {
            if (res.data.state === 'SUCCESS') {
                
				this.setState({
					hasRegister: !this.state.hasRegister
				});
				if (this.state.hasRegister) {
					Toast.info('拼课成功');
				} else {
					Toast.info('取消拼课成功');
				}
            } else {
				if (this.state.hasRegister) {
					Toast.info('拼课失败');
				} else {
					Toast.info('取消拼课失败');
				}
            } 
        });
	}

	_getRegisterStatus() {
		request({
            method:'post',
            url:'/activity/registerStatus?activityId='+this.state.activity.activityId,
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
            method:'post',
            url:'/activity/users?activityId='+this.state.activity.activityId,
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
						<img alt={this.state.activity.name} src={this.state.activity.picLink}/>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<span>{this.state.activity.activityName}</span>
						</div>
						<div className={styles.title1}>
							<span>活动时间：</span><span>{this.state.activity.activityStartTime}</span>
						</div>
						<div className={styles.title1}>
							<span>活动地点：</span><span>{this.state.activity.place}</span>
						</div>
						<div className={styles.title1}>
							<span>费用：</span><span>{this.state.activity.price}元/次</span>
						</div>
						<div className={styles.title1}>
							<span>拼课人数：</span><span>{this.state.activity.volume}</span>
						</div>
						<div className={styles.title1}>
							<span>发布者：</span><span>{this.state.activity.userId}</span>
						</div>
						<div className={styles.title1}>
							<span>课程提供方：</span><span>{this.state.activity.providerName}</span>
						</div>
						<div className={styles.title1}>
							<span>课程详情：</span><span>{this.state.activity.description}</span>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<span>拼课人员</span>
						</div>
						<div className={styles.users}>
							{
								this.state.activityUsers.map(v=>{
									return (
										<span>{v.name}</span>
									)
								})
							}
						</div>
					</div>
					<div className={styles.buttonLine}>
						{
							this.state.hasRegister ? (
								<div className={styles.redButton} onClick={()=>this._register()}>
									<span>取消拼课</span>
								</div>
							) : (
								<div className={styles.button} onClick={()=>this._register()}>
									<span>马上拼课</span>
								</div>
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
