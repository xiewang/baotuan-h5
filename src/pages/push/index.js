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
        content: '??????????????????',
      });
      return;
    }
    if (!this.state.price) {
      Toast.show({
        content: '???????????????',
      });
      return;
    }
    if (!this.state.activityEndTime) {
      Toast.show({
        content: '???????????????????????????',
      });
      return;
    }
    if (!this.state.activityStartTime) {
      Toast.show({
        content: '???????????????????????????',
      });
      return;
    }
    if (this.state.volume <= 0) {
      Toast.show({
        content: '??????????????????????????????0???',
      });
      return;
    }

    if (!this.state.phone) {
      Toast.show({
        content: '????????????????????????',
      });
      return;
    }

    if (!(/^1[3|4|5|7|8]\d{9}$/.test(this.state.phone))) {
      Toast.show({
        content: '?????????????????????',
      });
      return;
    }


    this.setState({
      maskVisible: true
    });
    Toast.show({
      content: '?????????',
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
          content: '?????????????????????????????????????????????????????????',
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
          content: '???????????????????????????????????????????????????',
        });
      }
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.section}>
          <Block title="????????????">
            <Grid columns={7} gap={8}>
              <Grid.Item span={2}>
                <div className={styles.title}>????????????</div>
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
                <div className={styles.title}>????????????</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <Input
                  placeholder="?????????????????????"
                  value={this.state.activityName}
                  onChange={val => this.setState({ activityName: val })}
                />
              </Grid.Item>
            </Grid>
            <Grid columns={7} gap={8}>
              <Grid.Item span={2}>
                <div className={styles.title}>?????????</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <Input
                  placeholder="????????????????????????"
                  value={this.state.phone}
                  onChange={val => this.setState({ phone: val })}
                />
              </Grid.Item>
            </Grid>
            <Grid columns={7} gap={8}>
              <Grid.Item span={2}>
                <div className={styles.title}>??????</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <Input
                  placeholder="?????????????????????"
                  value={this.state.location}
                  onChange={val => this.setState({ location: val })}
                />
              </Grid.Item>
            </Grid>
            <Grid columns={7} gap={8}>
              <Grid.Item span={2}>
                <div className={styles.title}>??????</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <Input
                  placeholder="?????????????????????"
                  value={this.state.price}
                  type="number"
                  onChange={val => this.setState({ price: val })}
                />
              </Grid.Item>
            </Grid>

            <Grid columns={7} gap={8}>
              <Grid.Item span={2}>
                <div className={styles.title}>??????</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <Input
                  placeholder="?????????????????????"
                  value={this.state.volume}
                  type="number"
                  onChange={val => this.setState({ volume: val })}
                />
              </Grid.Item>
            </Grid>

            <Grid columns={7} gap={8}>
              <Grid.Item span={2}>
                <div className={styles.title}>????????????</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <Button
                  style={{ width: '100%' }}
                  onClick={() => {
                    this.setState({ startDatePickerVisible: true })
                  }}
                > {this.state.activityStartTime ? moment(this.state.activityStartTime).format(
                  "YYYY???MM???DD???HH???mm???") : '-??? - ??? - ??? - ??? - ???'} </Button>
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
                <div className={styles.title}>????????????</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <Button
                  style={{ width: '100%' }}
                  onClick={() => {
                    this.setState({ endDatePickerVisible: true })
                  }}
                > {this.state.activityEndTime ? moment(this.state.activityEndTime).format(
                  "YYYY???MM???DD???HH???mm???") : '-??? - ??? - ??? - ??? - ???'} </Button>
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
                <div className={styles.title}>????????????</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <TextArea
                  title="?????????????????????"
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
            <List renderHeader={() => '???????????????'}>
              <Input
                placeholder=""
                value={this.state.userId}
                onChange={val=>this.setState({providerName: val})}
              >?????????</Input>
              <Input
                placeholder=""
                value={this.state.place}
                onChange={val=>this.setState({place: val})}
              >??????</Input>
              <Input
                placeholder=""
                value={this.state.providerWechat}
                onChange={val=>this.setState({providerWechat: val})}
              >?????????</Input>
            </List>
          </div> */}
        <div className={styles.section}>
          <Block title="?????????????????????">
            <Grid columns={7} gap={8}>
              <Grid.Item span={2}>
                <div className={styles.title}>?????????</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <Input
                  placeholder="??????????????????????????????"
                  value={this.state.providerName}
                  onChange={val => this.setState({ providerName: val })}
                />
              </Grid.Item>
            </Grid>
            <Grid columns={7} gap={8}>
              <Grid.Item span={2}>
                <div className={styles.title}>?????????</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <Input
                  placeholder="??????????????????"
                  value={this.state.providerWechat}
                  onChange={val => this.setState({ providerWechat: val })}
                />
              </Grid.Item>
            </Grid>
            <Grid columns={7} gap={8}>
              <Grid.Item span={2}>
                <div className={styles.title}>?????????</div>
              </Grid.Item>
              <Grid.Item span={5}>
                <Input
                  placeholder="??????????????????"
                  value={this.state.providerPhone}
                  onChange={val => this.setState({ providerPhone: val })}
                />
              </Grid.Item>
            </Grid>

          </Block>
        </div>
        <div className={styles.button}>
          <Button onClick={() => this._submit()} block color='primary' size='large'>??????</Button>
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
