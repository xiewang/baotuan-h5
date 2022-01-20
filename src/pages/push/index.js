import React, { Component } from 'react';
import styles from './styles.module.css';
import cns from 'classnames';
import request from '../../utils/request';
import Block from '../../components/block';
import {
  Input,
  List,
  Button,
  ImageUploader,
  Toast,
  TextArea,
  Grid,
  DatePicker,
  Mask
} from 'antd-mobile';
import { emitEvent } from '../../utils/common';
import { ImagePicker } from 'antd-mobile-v2';
import moment from "moment";
import { UploadOutline } from 'antd-mobile-icons';
import { update } from '../../actions/session';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Push extends Component {
  constructor(props) {
    super(props);
    this._setImage = this._setImage.bind(this);
    this.state = {
      activityName: '',
      location: '',
      price: '',
      createTime: '',
      activityStartTime: '',
      activityEndTime: '',
      updateTime: '',
      userId: '',
      description: '',
      volume: 10,
      providerWechat: '',
      providerName: '',
      providerPhone: '',
      image: [],
      startDatePickerVisible: false,
      endDatePickerVisible: false,
      maskVisible: false,
      phone: ''
    };
  }

  componentDidMount() {
  }

  _inputChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  _setImage(image, type, index) {
    this.setState({
      image: image
    });
  }

  _submit() {
    let params = {
      activityName: this.state.activityName,
      location: this.state.location,
      price: this.state.price,
      createTime: this.state.createTime,
      activityStartTime: this.state.activityStartTime,
      activityEndTime: this.state.activityEndTime,
      updateTime: this.state.updateTime,
      userId: this.state.userId,
      description: this.state.description,
      volume: this.state.volume,
      providerWechat: this.state.providerWechat,
      providerName: this.state.providerName,
      providerPhone: this.state.providerPhone,
      image: this.state.image[0] && this.state.image[0].file,
      phone: this.state.phone
    };
    let formData = new FormData();
    for (let key in params) {
      if (params[key])
        formData.append(key, params[key]);
    }

    if (!this.state.activityName) {
      Toast.show({
        content: '请输入活动名',
      });
      return;
    }
    if (!this.state.price) {
      Toast.show({
        content: '请输入价格',
      });
      return;
    }
    if (!this.state.activityEndTime) {
      Toast.show({
        content: '请输入活动结束时间',
      });
      return;
    }
    if (!this.state.activityStartTime) {
      Toast.show({
        content: '请输入活动开始时间',
      });
      return;
    }
    if (this.state.volume <= 0) {
      Toast.show({
        content: '活动参团人数不能少于0个',
      });
      return;
    }

    if (!this.state.phone) {
      Toast.show({
        content: '请输入您的手机号',
      });
      return;
    }

    if (!(/^1[3|4|5|7|8]\d{9}$/.test(this.state.phone))) {
      Toast.show({
        content: '您的手机号有误',
      });
      return;
    }


    this.setState({
      maskVisible: true
    });
    Toast.show({
      content: '上传中',
      icon: 'loading',
      duration: 0
    })

    request({
      method: 'post',
      url: '/activity/insert',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      if (res.data.state === 'SUCCESS') {
        Toast.clear();
        Toast.show({
          icon: 'success',
          content: '上传成功。内容将进行审核，审核后会上线',
        });
        this.setState({
          activityName: '',
          location: '',
          price: '',
          createTime: '',
          activityStartTime: '',
          activityEndTime: '',
          updateTime: '',
          userId: '',
          description: '',
          volume: 10,
          providerWechat: '',
          providerName: '',
          providerPhone: '',
          image: [],
          startDatePickerVisible: false,
          endDatePickerVisible: false,
          maskVisible: false,
          phone: ''
        });
        emitEvent('pushSuccess', {});
      }
      if (res.data.state === 'FAILED' && res.data.error.message === 'the phone has been registered') {
        Toast.show({
          icon: 'fail',
          content: '您的手机号已被注册，请换一个手机号',
        });
      }
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.section}>
          <Block title="活动信息">
            <Grid columns={7} gap={8}>
              <Grid.Item span={2}>
                <div className={styles.title}>活动图片</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <ImagePicker
                  files={this.state.image}
                  onChange={this._setImage}
                  multiple={false}
                  selectable={this.state.image.length < 1}
                />
              </Grid.Item>
            </Grid>
            <Grid columns={7} gap={8}>
              <Grid.Item span={2}>
                <div className={styles.title}>活动名称</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <Input
                  placeholder="请输入活动名称"
                  value={this.state.activityName}
                  onChange={val => this.setState({ activityName: val })}
                />
              </Grid.Item>
            </Grid>
            <Grid columns={7} gap={8}>
              <Grid.Item span={2}>
                <div className={styles.title}>手机号</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <Input
                  placeholder="请输入您的手机号"
                  value={this.state.phone}
                  onChange={val => this.setState({ phone: val })}
                />
              </Grid.Item>
            </Grid>
            <Grid columns={7} gap={8}>
              <Grid.Item span={2}>
                <div className={styles.title}>地点</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <Input
                  placeholder="请输入活动地点"
                  value={this.state.location}
                  onChange={val => this.setState({ location: val })}
                />
              </Grid.Item>
            </Grid>
            <Grid columns={7} gap={8}>
              <Grid.Item span={2}>
                <div className={styles.title}>价格</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <Input
                  placeholder="请输入活动价格"
                  value={this.state.price}
                  type="number"
                  onChange={val => this.setState({ price: val })}
                />
              </Grid.Item>
            </Grid>

            <Grid columns={7} gap={8}>
              <Grid.Item span={2}>
                <div className={styles.title}>人数</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <Input
                  placeholder="请输入活动人数"
                  value={this.state.volume}
                  type="number"
                  onChange={val => this.setState({ volume: val })}
                />
              </Grid.Item>
            </Grid>

            <Grid columns={7} gap={8}>
              <Grid.Item span={2}>
                <div className={styles.title}>开始时间</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <Button
                  style={{ width: '100%' }}
                  onClick={() => {
                    this.setState({ startDatePickerVisible: true })
                  }}
                > {this.state.activityStartTime ? moment(this.state.activityStartTime).format(
                  "YYYY年MM月DD日HH时mm分") : '-年 - 月 - 日 - 时 - 分'} </Button>
                <DatePicker
                  visible={this.state.startDatePickerVisible}
                  onClose={() => {
                    this.setState({ startDatePickerVisible: false })
                  }}
                  precision='minute'
                  onConfirm={date => {
                    this.setState({ activityStartTime: date })
                  }}
                />
              </Grid.Item>
            </Grid>
            <Grid columns={7} gap={8}>
              <Grid.Item span={2}>
                <div className={styles.title}>结束时间</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <Button
                  style={{ width: '100%' }}
                  onClick={() => {
                    this.setState({ endDatePickerVisible: true })
                  }}
                > {this.state.activityEndTime ? moment(this.state.activityEndTime).format(
                  "YYYY年MM月DD日HH时mm分") : '-年 - 月 - 日 - 时 - 分'} </Button>
                <DatePicker
                  visible={this.state.endDatePickerVisible}
                  onClose={() => {
                    this.setState({ endDatePickerVisible: false })
                  }}
                  precision='minute'
                  onConfirm={date => {
                    this.setState({ activityEndTime: date })
                  }}
                />
              </Grid.Item>
            </Grid>

            <Grid columns={7} gap={8}>
              <Grid.Item span={2}>
                <div className={styles.title}>其他说明</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <TextArea
                  title="请输入其他说明"
                  value={this.state.description}
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  onChange={val => this.setState({ description: val })}
                  // labelNumber={5}
                  rows={3}
                />
              </Grid.Item>
            </Grid>

          </Block>
        </div>
        {/* <div className={styles.section}>
            <List renderHeader={() => '发起人信息'}>
              <Input
                placeholder=""
                value={this.state.userId}
                onChange={val=>this.setState({providerName: val})}
              >用户名</Input>
              <Input
                placeholder=""
                value={this.state.place}
                onChange={val=>this.setState({place: val})}
              >身份</Input>
              <Input
                placeholder=""
                value={this.state.providerWechat}
                onChange={val=>this.setState({providerWechat: val})}
              >微信名</Input>
            </List>
          </div> */}
        <div className={styles.section}>
          <Block title="拼团提供方信息">
            <Grid columns={7} gap={8}>
              <Grid.Item span={2}>
                <div className={styles.title}>用户名</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <Input
                  placeholder="请输入来抱团呀用户名"
                  value={this.state.providerName}
                  onChange={val => this.setState({ providerName: val })}
                />
              </Grid.Item>
            </Grid>
            <Grid columns={7} gap={8}>
              <Grid.Item span={2}>
                <div className={styles.title}>微信名</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <Input
                  placeholder="请输入微信名"
                  value={this.state.providerWechat}
                  onChange={val => this.setState({ providerWechat: val })}
                />
              </Grid.Item>
            </Grid>
            <Grid columns={7} gap={8}>
              <Grid.Item span={2}>
                <div className={styles.title}>手机号</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <Input
                  placeholder="请输入手机号"
                  value={this.state.providerPhone}
                  onChange={val => this.setState({ providerPhone: val })}
                />
              </Grid.Item>
            </Grid>

          </Block>
        </div>
        <div className={styles.button}>
          <Button onClick={() => this._submit()} block color='primary' size='large'>提交</Button>
        </div>
        <Mask visible={this.state.maskVisible} color='white' />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Push));
