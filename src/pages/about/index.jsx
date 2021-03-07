import Taro from '@tarojs/taro'
import {View} from "@tarojs/components";
import React, {Component} from 'react'
import './style.less'


export default class Index extends Component {


  render() {
    return (
      <View id='about-root'>关于keeping记账系统，这里你可以自己随便写一些描述性的内容</View>
    );
  }
}
