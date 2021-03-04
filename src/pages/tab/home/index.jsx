import Taro, {Events} from '@tarojs/taro'
import React, {Component} from 'react'
import {Text, View, Image} from "@tarojs/components";
import "taro-ui/dist/style/components/tab-bar.scss" // 按需引入
import './style.less'
import {AtTabs, AtTabsPane} from 'taro-ui'
import "taro-ui/dist/style/components/tabs.scss";

export default class Home extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      current: 0,
      costArray: []
    }
  }

  handleClick(value) {
    this.setState({
      current: value
    })
  }

  componentDidMount() {
    let query = Bmob.Query('CostEntity');
    query.find().then(res => {
      console.log(res)
      this.setState({
        costArray: res
      })
    });
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


  goDetailPage(item) {
    Taro.navigateTo({
      url: '/pages/tab/data/detail/index?id='+item.objectId
    })


  }

  render() {
    let {costArray, current} = this.state
    const tabList = [{title: '收入'}, {title: '支出'}]
    return (
      <View id='home-root'>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0}>
            {
              ((costArray).filter(item => item.moneyType == 0) || []).map((item, index) => {
                return <View id='view-shouru' onClick={() => this.goDetailPage(item)}>
                  <Text id='home-item-title'>支出</Text>
                  <Text id='item-money-count'>金额 : {item.number}</Text>
                  <View id='item-bottom-view'>
                    <Text id='item-money-type'>消费类别 : {this.getCostType(item.costType)}</Text>
                    <Text id='item-money-date'>{item.createdAt}</Text>
                  </View>

                </View>
              })
            }
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            {
              ((costArray).filter(item => item.moneyType == 1) || []).map((item, index) => {
                return <View id='view-shouru' onClick={() => this.goDetailPage(item)}>
                  <Text id='home-item-title'>收入</Text>
                  <Text id='item-money-count'>金额 : {item.number}</Text>
                  <View id='item-bottom-view'>
                    <Text id='item-money-type'>消费类别 : {this.getCostType(item.costType)}</Text>
                    <Text id='item-money-date'>{item.createdAt}</Text>
                  </View>

                </View>
              })
            }
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
