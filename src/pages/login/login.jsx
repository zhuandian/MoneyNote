import React, {Component} from 'react'
import {View, Text, Input} from '@tarojs/components'
import {AtButton, AtInput} from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/input.scss" // 按需引入
import './style.less'

export default class Login extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      value: ''
    }
  }
  handleChange (value) {
    this.setState({
      value
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value
  }

  render() {
    return (
      <View className='index'>

        <AtInput
          name='value'
          title='账号'
          type='text'
          placeholder='标准五个字'
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
        <AtInput
          name='value'
          title='密码'
          type='text'
          placeholder='标准五个字'
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
        <AtButton type='primary'>登 录</AtButton>
      </View>
    )
  }
}
