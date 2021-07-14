import React, { Component } from 'react';
import styles from './styles.module.css';
import cns from 'classnames';
import request from '../../utils/request';
import { 
  InputItem,
  List,
  Button,
  ImagePicker,
  Flex,
  Toast,
  DatePicker,
  TextareaItem
} from 'antd-mobile';

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
          image: []
        };
    }

    componentDidMount() {

    }
    
    _inputChange(e){
      this.setState({
        name:e.target.value
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
        image: this.state.image[0].file
      };
      let formData = new FormData();
      for(let key in params){
        if( params[key])
          formData.append(key , params[key]);
      }
      request({
            method:'post',
            url:'/activity/insert',
            data: formData,
            headers:{
                'Content-Type': 'multipart/form-data'
            }
      }).then((res) => {
          if (res.data.state === 'SUCCESS') {
              Toast.info('上传成功')
          } 
      });
    }

    render() {
      
      return (
        <div className={styles.container}>
          <div className={styles.section}>
            <List renderHeader={() => '活动信息'}>
              <Flex align="center" justify="start">
                <span className={styles.title}>活动图片</span>
                <Flex.Item>
                  <ImagePicker
                      files={this.state.image}
                      onChange={this._setImage}
                      multiple={false}
                      selectable={this.state.image.length <1}
                    />
                </Flex.Item>
              </Flex>
              <InputItem
                placeholder=""
                value={this.state.activityName}
                onChange={val=>this.setState({activityName: val})}
              >活动名称</InputItem>
              <InputItem
                placeholder=""
                value={this.state.location}
                onChange={val=>this.setState({location: val})}
              >地点</InputItem>
              <InputItem
                placeholder=""
                value={this.state.price}
                type="number"
                onChange={val=>this.setState({price: val})}
              >价格</InputItem>
              <DatePicker
                value={this.state.activityStartTime}
                onChange={date => this.setState({ activityStartTime: date})}
              >
                <List.Item arrow="horizontal">开始时间</List.Item>
              </DatePicker>
              <DatePicker
                value={this.state.activityEndTime}
                onChange={date => this.setState({ activityEndTime: date})}
              >
                <List.Item arrow="horizontal">结束时间</List.Item>
              </DatePicker>
             
              <InputItem
                placeholder=""
                value={this.state.volume}
                type="number"
                onChange={val=>this.setState({volume: val})}
              >人数</InputItem>
              <TextareaItem
                title="其他说明"
                autoHeight
                value={this.state.description}
                onChange={val=>this.setState({description: val})}
                labelNumber={5}
                rows={3}
              />
            </List>
          </div>
          {/* <div className={styles.section}>
            <List renderHeader={() => '发起人信息'}>
              <InputItem
                placeholder=""
                value={this.state.userId}
                onChange={val=>this.setState({providerName: val})}
              >用户名</InputItem>
              <InputItem
                placeholder=""
                value={this.state.place}
                onChange={val=>this.setState({place: val})}
              >身份</InputItem>
              <InputItem
                placeholder=""
                value={this.state.providerWechat}
                onChange={val=>this.setState({providerWechat: val})}
              >微信名</InputItem>
            </List>
          </div> */}
          <div className={styles.section}>
            <List renderHeader={() => '课程提供方信息'}>
              <InputItem
                placeholder="香香树用户名"
                value={this.state.providerName}
                onChange={val=>this.setState({providerName: val})}
              >用户名</InputItem>
              <InputItem
                placeholder=""
                value={this.state.providerWechat}
                onChange={val=>this.setState({providerWechat: val})}
              >微信名</InputItem>
              <InputItem
                placeholder=""
                value={this.state.providerPhone}
                onChange={val=>this.setState({providerPhone: val})}
              >手机号</InputItem>
            </List>
          </div>
          <div className={styles.button}>
            <Button onClick={()=>this._submit()} type="primary">提交</Button>
          </div>
          
        </div>
      );
    }
}


export default Push;
