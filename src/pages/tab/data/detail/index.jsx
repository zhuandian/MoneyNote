import Taro, {getCurrentInstance} from '@tarojs/taro'
import React, {Component} from 'react'
import {Text, View} from "@tarojs/components";
import "taro-ui/dist/style/components/tab-bar.scss" // 按需引入
import './index.less'
import "taro-ui/dist/style/components/tabs.scss";

export default class Detail extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      current: 0,
      costEntity: null
    }
  }

  handleClick(value) {
    this.setState({
      current: value
    })
  }

  componentDidMount() {
    let id = getCurrentInstance().router.params.id

    console.log(id)
    let query = Bmob.Query('CostEntity');
    query.get(id).then(res => {
      this.setState({
        costEntity: res
      })
    }).catch(err => {
      console.log(err)
    })


  }

  /**
   *
   * moneyType  0 收入  1，支出
   *
   * costType
   * 0 日常消费  1。人情往来  2 工资  3 交通出行
   *
   */

  getCostType(type) {
    let typeInfo = "日常消费"
    switch (type) {
      case 0:
        typeInfo = "日常消费"
        break;
      case 1:
        typeInfo = "人情往来"
        break;
      case 2:
        typeInfo = "工资"
        break;
      case 3:
        typeInfo = "交通出行"
        break;
    }

    return typeInfo
  }

  render() {
    let {costEntity} = this.state
    return (
      costEntity == null ?
        <View></View>
        :
        <View id='detail-page-root'>
          <Text id='home-item-title'>账单类型 : {costEntity.moneyType == 0 ? "收入" : "支出"}</Text>
          <Text id='item-money-count'>金额 : {costEntity.number}</Text>

          <Text id='item-money-type'>消费类别 : {this.getCostType(costEntity.costType)}</Text>
          <Text id='item-money-date'>账单日期 : {costEntity.createdAt}</Text>
        </View>
    )
  }
}
