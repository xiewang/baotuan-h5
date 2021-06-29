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
  Toast
} from 'antd-mobile';

class Push extends Component {
    constructor(props) {
        super(props);
        this._setImage = this._setImage.bind(this);
        this.state = {
          activityName: "xxtree",
          location: "",
          price: "",
          createTime: "",
          activityTime: "",
          updateTime: "",
          userId: "",
          description: "",
          volume: 10,
          providerWechat: "",
          providerName: "",
          providerPhone: "",
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
        activityTime: this.state.activityTime,
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
                value={this.state.place}
                onChange={val=>this.setState({place: val})}
              >地点</InputItem>
              <InputItem
                placeholder=""
                value={this.state.price}
                onChange={val=>this.setState({price: val})}
              >价格</InputItem>
              <InputItem
                placeholder=""
                value={this.state.activtiyTime}
                onChange={val=>this.setState({activtiyTime: val})}
              >时间</InputItem>
              <InputItem
                placeholder=""
                value={this.state.description}
                onChange={val=>this.setState({description: val})}
              >其他说明</InputItem>
            </List>
          </div>
          <div className={styles.section}>
            <List renderHeader={() => '发起人活动信息'}>
              <InputItem
                placeholder=""
                value={this.state.place}
                onChange={val=>this.setState({place: val})}
              >用户名</InputItem>
              <InputItem
                placeholder=""
                value={this.state.place}
                onChange={val=>this.setState({place: val})}
              >身份</InputItem>
              <InputItem
                placeholder=""
                value={this.state.place}
                onChange={val=>this.setState({place: val})}
              >微信名</InputItem>
            </List>
          </div>
          <div className={styles.section}>
            <List renderHeader={() => '课程提供方信息'}>
              <InputItem
                placeholder=""
                value={this.state.place}
                onChange={val=>this.setState({place: val})}
              >用户名</InputItem>
              <InputItem
                placeholder=""
                value={this.state.place}
                onChange={val=>this.setState({place: val})}
              >微信名</InputItem>
              <InputItem
                placeholder=""
                value={this.state.place}
                onChange={val=>this.setState({place: val})}
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
