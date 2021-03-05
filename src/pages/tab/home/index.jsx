import Taro, {Events} from '@tarojs/taro'
import React, {Component} from 'react'
import {Text, View, Image} from "@tarojs/components";
import "taro-ui/dist/style/components/tab-bar.scss" // 按需引入
import './style.less'
import "taro-ui/dist/style/components/tabs.scss";
import baoxiao_select from "../../../image/baoxiao_select.png";
import gongzi_select from "../../../image/gongzi_select.png";
import hongbao_select from "../../../image/hongbao_select.png";
import jiangjinguize_select from "../../../image/jiangjinguize_select.png";
import lvyou_select from "../../../image/lvyou_select.png";
import qita_select from "../../../image/qita_select.png";
import riyongpin_select from "../../../image/riyongpin_select.png";
import traffic_select from "../../../image/traffic_select.png";
import xuexi_select from "../../../image/xuexi_select.png";
import yiban_select from "../../../image/yiban_select.png";
import yiban1_select from "../../../image/yiban_1_select.png";
import yongcan_select from "../../../image/yongcanqu_select.png";
import yule_select from "../../../image/yule_select.png";
import ziyuan_select from "../../../image/ziyuan_select.png";

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
    let typeInfo = "其他"
    switch (type) {
      case 0:
        typeInfo = "学习"
        break;
      case 1:
        typeInfo = "一般"
        break;
      case 2:
        typeInfo = "用餐"
        break;
      case 3:
        typeInfo = "交通"
        break;
      case 4:
        typeInfo = "日用品"
        break;
      case 5:
        typeInfo = "娱乐"
        break;
      case 6:
        typeInfo = "旅游"
        break;
      case 7:
        typeInfo = "其他"
        break;
      case 10:
        typeInfo = "一般"
        break;
      case 11:
        typeInfo = "工资"
        break;
      case 12:
        typeInfo = "红包"
        break;
      case 13:
        typeInfo = "奖金"
        break;
      case 14:
        typeInfo = "投资"
        break;
      case 15:
        typeInfo = "报销"
        break;
      case 16:
        typeInfo = "其他"
        break;
    }

    return typeInfo
  }


  goDetailPage(item) {
    Taro.navigateTo({
      url: '/pages/tab/data/detail/index?id=' + item.objectId
    })


  }

  getImgType(costType) {
    let img = qita_select

    switch (costType) {
      case 0:
        img = xuexi_select
        break;
      case 1:
        img = yiban_select
        break;
      case 2:
        img = yongcan_select
        break;
      case 3:
        img = traffic_select
        break;
      case 4:
        img = riyongpin_select
        break;
      case 5:
        img = yule_select
        break;
      case 6:
        img = lvyou_select
        break;
      case 7:
        img = qita_select
        break;
      case 10:
        img = yiban1_select
        break;
      case 11:
        img = gongzi_select
        break;
      case 12:
        img = hongbao_select
        break;
      case 13:
        img = jiangjinguize_select
        break;
      case 14:
        img = ziyuan_select
        break;
      case 15:
        img = baoxiao_select
        break;
      case 16:
        img = qita_select
        break;
    }
    return img
  }

  render() {


    let {costArray} = this.state

    return (
      <View id='home-root'>
        {
          (costArray || []).map((item, index) => {
            return <View id='view-shouru' onClick={() => this.goDetailPage(item)}>
              <View id='item-content-view'>
                <Image id='shouru-item-icon' src={this.getImgType(item.costType)}/>
                <Text id='home-item-title'>{this.getCostType(item.costType)}</Text>
                <Text
                  id={item.moneyType == 0 ? 'item-money-count-shouru' : 'item-money-count-zhichu'}>{item.number}</Text>
              </View>

              <View id='item-bottom-view'/>

            </View>
          })
        }
      </View>
    )
  }
}
