import Taro from '@tarojs/taro'
import {View} from "@tarojs/components";
import React, {Component} from 'react'
import './style.less'

import {AtButton, AtTextarea} from "taro-ui";
import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/input.scss" // 按需引入
import "taro-ui/dist/style/components/textarea.scss"


export default class Index extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      desc: ''
    }
  }

  handleDescChange(value) {
    this.setState({
      desc: value
    })

  }


  handleClick() {
    let desc = this.state.desc;
    var storageSync = Taro.getStorageSync('userEntity');
    const query = window.bmob.Query('FeedBack');
    query.set("desc",desc)
    query.set("userId",storageSync.objectId)
    query.set("userName",storageSync.username)
    query.save().then(res => {
      Taro.showToast({title:"反馈成功"})
      this.setState({desc:""})
    }).catch(err => {
      Taro.showToast({title:"反馈失败"})
    })
  }

  render() {
    return (
      <View id='feedback-root'>

        <View id='empty-view'/>

        <AtTextarea
          id='cost-desc'
          value={this.state.desc}
          onChange={this.handleDescChange.bind(this)}
          maxLength={200}
          placeholder='添加备注...'
        />
        <View id='empty-view'/>
        <AtButton type='primary' onClick={() => this.handleClick()}>添加反馈</AtButton>
      </View>
    );
  }
}
