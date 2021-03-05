import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import {Text, View, Image} from "@tarojs/components";
import "taro-ui/dist/style/components/tab-bar.scss" // 按需引入
import './style.less'

export default class My extends Component {


  render() {
    return (
      <View id='my-view-root'>

        <Text id = 'app-title'>keeping记账系统</Text>
        <View id='my-item-view' onClick={()=>{
          Taro.navigateTo({url:'/pages/tab/bill/index'})
        }}>
          <Text>账单统计</Text>
          <Text> > </Text>
        </View>
        <View id='my-item-view'>
          <Text>修改密码</Text>
          <Text> > </Text>
        </View>
        <View id='my-item-view'>
          <Text>关于keeping记账系统</Text>
          <Text> > </Text>
        </View>
        <View id='my-item-view'>
          <Text>意见反馈</Text>
          <Text> > </Text>
        </View>

        <Text id='btn-logout'>注销登录</Text>
      </View>
    )
  }
}
