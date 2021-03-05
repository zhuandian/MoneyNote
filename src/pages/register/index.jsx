import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import {View, Text, Input} from '@tarojs/components'
import {AtButton, AtInput} from 'taro-ui'
import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/input.scss" // 按需引入
import './style.less'

export default class Register extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      username: '',
      password: '',
      phone: ''
    }
  }

  handleUserNameChange(value) {
    this.setState({
      username: value
    })
    // // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    // return value
  }

  handlePasswordChange(value) {
    this.setState({
      password: value
    })

  }

  handlePhoneChange(value) {
    this.setState({
      phone: value
    })

  }

  handleClick() {
    var password = this.state.password
    var username = this.state.username
    var phone = this.state.phone

    let params = {
      username: username,
      password: password,
      phone: phone,
    }
    if (username.length < 6 || password.length < 6) {
      Taro.showToast({
        icon: 'none',
        title: '账号或密码长度不正确'
      })
    } else {
      Bmob.User.register(params).then(res => {
        // console.log(res)
        Taro.showToast({
          icon: 'none',
          title: '注册成功'
        })
        Taro.redirectTo({
          url: '/pages/login/login'
        })
      }).catch(err => {
        Taro.showToast({
          icon: 'none',
          title: err.message
        })
        console.log(err)
      });
    }

  }

  render() {
    return (
      <View className='index'>

        <AtInput
          id='username'
          name='username'
          title='账号'
          type='text'
          placeholder='请输入账号'
          value={this.state.username}
          onChange={this.handleUserNameChange.bind(this)}
        />
        <AtInput
          id='password'
          name='password'
          title='密码'
          type='password'
          placeholder='请输入密码'
          value={this.state.password}
          onChange={this.handlePasswordChange.bind(this)}
        />
        <AtInput
          id='phone'
          name='phone'
          title='手机号'
          type='text'
          placeholder='请输入手机号'
          value={this.state.phone}
          onChange={this.handlePhoneChange.bind(this)}
        />
        <AtButton type='primary' onClick={() => this.handleClick()}>注 册</AtButton>
      </View>
    )
  }
}
