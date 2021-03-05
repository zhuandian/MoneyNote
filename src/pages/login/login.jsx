import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import {View, Text, Input} from '@tarojs/components'
import {AtButton, AtInput} from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/input.scss" // 按需引入
import './style.less'

export default class Login extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      username: '',
      password: '',
    }
  }

  handleUserNameChange(username) {
    this.setState({
      username: username
    })
    // // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    // return value
  }

  handlePasswordChange(password) {
    this.setState({
      password: password
    })

  }

  handleClick() {
    var password = this.state.password
    var username = this.state.username


    if (username.length < 6 || password.length < 6) {
      Taro.showToast({
        icon: 'none',
        title: '账号或密码长度不正确'
      })
    } else {
      Bmob.User.login(username, password).then(res => {
        console.log(res)

        Taro.showLoading({
          title: '登录中...',
        })
        setTimeout(function () {
          Taro.hideLoading()
          Taro.redirectTo({
            url: '/pages/tab/main'
          })
        }, 2000)


      }).catch(err => {
        Taro.showToast({
          icon: 'none',
          title: err.error
        })
        console.log(err)
      });
    }

  }

  render() {
    return (
      <View className='login-root'>

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
        <Text id='btn-login' onClick={() => this.handleClick()}>登 录</Text>

        <Text id='btn-go-register' onClick={() => {
          Taro.navigateTo({url: '/pages/register/index'})
        }}>去注册？</Text>
      </View>
    )
  }
}
