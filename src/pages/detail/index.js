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
			hasRegister: false
		};
	}

	componentDidMount() {
		this.setState({
			activity: this.props.location.state,
		});
		this.state.activity = this.props.location.state;
		this._getRegisterStatus();
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

	render() {
		return (
			<div className={styles.container}>
				<Header title="活动详情" {...this.props} />
				<div className={styles.content}>
					<div className={styles.iamge}>
						<img alt={this.state.activity.name} src={this.state.activity.picLink}/>
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
