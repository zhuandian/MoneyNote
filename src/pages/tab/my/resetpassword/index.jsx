import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import {View, Text, Input} from '@tarojs/components'
import {AtButton, AtInput} from 'taro-ui'
import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/input.scss" // 按需引入
import './style.less'

export default class Index extends Component {

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
    var storageSync = Taro.getStorageSync('userEntity');

    let localUserName = storageSync.username
    let localPhone = storageSync.phone


    var password = this.state.password
    var username = this.state.username
    var phone = this.state.phone

    if (localPhone != phone) {
      Taro.showToast({title: "手机号不对",icon: 'none'})
      return;
    }

    if (localUserName != username) {
      Taro.showToast({title: "用户名不对",icon: 'none'})
      return
    }

    if (username.length < 6 || password.length < 6) {
      Taro.showToast({
        icon: 'none',
        title: '账号或密码长度不正确'
      })
    } else {
      const query = Bmob.Query('_User');
      query.set("id", storageSync.objectId)
      query.set("password", password)
      query.save().then(res => {
        Taro.showLoading({
          title: '更新中...',
        })
        setTimeout(function () {
          Taro.hideLoading()
          Taro.redirectTo({
            url: '/pages/login/login'
          })
        }, 2000)
        Taro.removeStorageSync("userEntity")
      }).catch(err => {
        Taro.showToast({title: "修改失败"})
        console.log(err)
      })
    }

  }

  render() {
    return (
      <View className='reset-password-root'>

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
          title='新密码'
          type='password'
          placeholder='请输入新密码'
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

        <View id='empty-view'/>
        <AtButton type='primary' onClick={() => this.handleClick()}>修改密码</AtButton>
      </View>
    )
  }
}
