import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import {Text, View, Image} from "@tarojs/components";
import "taro-ui/dist/style/components/tab-bar.scss" // 按需引入
import './style.less'
import {AtButton, AtInput,AtTextarea} from "taro-ui";
import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/input.scss" // 按需引入
import "taro-ui/dist/style/components/textarea.scss" // 按需引入

export default class Data extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      number: 0,
      moneyType: 0,
      costType: 0,
      desc:''
    }
  }

  handleDescChange(value) {
    this.setState({
      desc: value
    })

  }
  handleNumberChange(value) {
    this.setState({
      number: value
    })

  }
  onCostTypeSelected(value){
    this.setState({
      costType:value
    })
  }

  onMoneyTypeSelected(value){
    this.setState({
      moneyType:value
    })
  }

  handleClick(){

    var number = parseInt(this.state.number)
    var moneyType = this.state.moneyType
    var costType = this.state.costType
    var desc = this.state.desc


    if (number.length <1) {
      Taro.showToast({
        icon: 'none',
        title: '请输入正确金额'
      })
    } else {

      let query = Bmob.Query('CostEntity');
      query.set("number",number)
      query.set("moneyType",moneyType)
      query.set("costType",costType)
      query.set("desc",desc)
      query.save().then(res => {
        console.log(res)
        Taro.showToast({
          icon: 'none',
          title: '添加成功'
        })

        this.setState({
          number:0,
          desc:''
        })
      }).catch(err => {
        Taro.showToast({
          icon: 'none',
          title: err.error
        })
        console.log(err)
      })

    }
  }

  /**
   *
   * moneyType  0 收入  1，支出
   *
   * costType
   * 0 日常消费  1。人情往来  2 工资  3 交通出行
   *
   */
  render() {
    let {moneyType, costType} = this.state
    return (
      <View id='data-root'>

        <AtInput
          name='value'
          title='金额'
          type='number'
          placeholder='请输入金额'
          value={this.state.number}
          onChange={this.handleNumberChange.bind(this)}
        />
        <Text className='title-data'>类型</Text>
        <View className='type-view'>
          <Text className={moneyType == 0 ? 'type-item-selected' : 'type-item-normal'} onClick={()=>this.onMoneyTypeSelected(0)}>收入</Text>
          <Text className={moneyType == 1 ? 'type-item-selected' : 'type-item-normal'} onClick={()=>this.onMoneyTypeSelected(1)}>支出</Text>
        </View>
        <Text className='title-data'>消费类别</Text>
        <View className='type-view'>
          <Text className={costType == 0 ? 'type-item-selected' : 'type-item-normal'} onClick={()=>this.onCostTypeSelected(0)}>日常消费</Text>
          <Text className={costType == 1 ? 'type-item-selected' : 'type-item-normal'} onClick={()=>this.onCostTypeSelected(1)}>人情往来</Text>
          <Text className={costType == 2 ? 'type-item-selected' : 'type-item-normal'} onClick={()=>this.onCostTypeSelected(2)}>工资</Text>
          <Text className={costType == 3 ? 'type-item-selected' : 'type-item-normal'} onClick={()=>this.onCostTypeSelected(3)}>交通出行</Text>
        </View>

        <div id='item-space'/>
        <AtTextarea
          id='cost-desc'
          value={this.state.desc}
          onChange={this.handleDescChange.bind(this)}
          maxLength={200}
          placeholder='添加备注...'
        />
        <div id='item-space'/>
        <AtButton type='primary' onClick={() => this.handleClick()}>记 一 笔</AtButton>
      </View>
    )
  }
}
