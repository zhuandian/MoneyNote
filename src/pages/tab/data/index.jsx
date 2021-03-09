import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import {Text, View, Image} from "@tarojs/components";
import "taro-ui/dist/style/components/tab-bar.scss" // 按需引入
import './style.less'
import {AtButton, AtInput, AtTextarea} from "taro-ui";
import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/input.scss" // 按需引入
import "taro-ui/dist/style/components/textarea.scss"
import baoxiao from "../../../image/baoxiao.png";
import baoxiao_select from "../../../image/baoxiao_select.png";
import gongzi from "../../../image/gongzi.png";
import gongzi_select from "../../../image/gongzi_select.png";
import hongbao from "../../../image/hongbao.png";
import hongbao_select from "../../../image/hongbao_select.png";
import jiangjinguize from "../../../image/jiangjinguize.png";
import jiangjinguize_select from "../../../image/jiangjinguize_select.png";
import lvyou from "../../../image/lvyou.png";
import lvyou_select from "../../../image/lvyou_select.png";
import qita from "../../../image/qita.png";
import qita_select from "../../../image/qita_select.png";
import riyongpin from "../../../image/riyongpin.png";
import riyongpin_select from "../../../image/riyongpin_select.png";
import traffic from "../../../image/traffic.png";
import traffic_select from "../../../image/traffic_select.png";
import xuexi from "../../../image/xuexi.png";
import xuexi_select from "../../../image/xuexi_select.png";
import yiban from "../../../image/yiban.png";
import yiban_select from "../../../image/yiban_select.png";
import yiban1 from "../../../image/yiban_1.png";
import yiban1_select from "../../../image/yiban_1_select.png";
import yongcan from "../../../image/yongcanqu.png";
import yongcan_select from "../../../image/yongcanqu_select.png";
import yule from "../../../image/yule.png";
import yule_select from "../../../image/yule_select.png";
import ziyuan from "../../../image/ziyuan.png";
import ziyuan_select from "../../../image/ziyuan_select.png";


export default class Data extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      number: 0,
      moneyType: 0,
      costType: 0,
      desc: ''
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

  onCostTypeSelected(value) {
    this.setState({
      costType: value
    })
  }

  onMoneyTypeSelected(value) {
    this.setState({
      moneyType: value,
      costType: value == 0 ? 0 : 8
    })
  }

  handleClick() {

    var number = parseFloat(this.state.number)
    var moneyType = this.state.moneyType
    var costType = this.state.costType
    var desc = this.state.desc


    if (number.length < 1) {
      Taro.showToast({
        icon: 'none',
        title: '请输入正确金额'
      })
    } else {

      var storageSync = Taro.getStorageSync('userEntity');
      let query = window.bmob.Query('CostEntity');
      query.set("number", number)
      query.set("moneyType", moneyType)
      query.set("costType", costType)
      query.set("desc", desc)
      query.set("userId", storageSync.objectId)
      query.save().then(res => {
        console.log(res)
        Taro.showToast({
          icon: 'none',
          title: '添加成功'
        })

        this.setState({
          number: 0,
          desc: ''
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
   * moneyType  0 支出  1，收入
   *
   * costType
   * 支出
   * 0 学习  1。一般  2 用餐  3 交通 4。日用品 5 娱乐 6旅游 7其他
   *
   * 收入
   * 8 一般 9工资  10红包 11奖金 12投资 13报销 14其他
   *
   *
   */
  render() {
    let {moneyType, costType} = this.state

    return (
      <View id='data-root'>

        <AtInput
          name='value'
          title='金额'
          type='digit'
          placeholder='请输入金额'
          value={this.state.number}
          cursor={this.state.number.length}
          onChange={this.handleNumberChange.bind(this)}
        />
        <Text className='title-data'>类型</Text>
        <View className='money-type-view'>
          <Text className={moneyType == 1 ? 'type-item-selected' : 'type-item-normal'}
                onClick={() => this.onMoneyTypeSelected(1)}>收入</Text>
          <Text className={moneyType == 0 ? 'type-item-selected' : 'type-item-normal'}
                onClick={() => this.onMoneyTypeSelected(0)}>支出</Text>
        </View>
        <Text className='title-data'>消费类别</Text>


        {
          moneyType == 0 ?
            <View className='cost-type-view'>
              <View className='item-view' onClick={() => this.onCostTypeSelected(0)}>
                <Image id='meun-img' src={costType == 0 ? xuexi_select : xuexi}></Image>
                <Text className={costType == 0 ? 'type-item-selected' : 'type-item-normal'}>其他</Text>
              </View>
              <View className='item-view' onClick={() => this.onCostTypeSelected(1)}>
                <Image id='meun-img' src={costType == 1 ? yiban_select : yiban}></Image>
                <Text className={costType == 1 ? 'type-item-selected' : 'type-item-normal'}>学习</Text>
              </View>
              <View className='item-view' onClick={() => this.onCostTypeSelected(2)}>
                <Image id='meun-img' src={costType == 2 ? yongcan_select : yongcan}></Image>
                <Text className={costType == 2 ? 'type-item-selected' : 'type-item-normal'}>一般</Text>
              </View>
              <View className='item-view' onClick={() => this.onCostTypeSelected(3)}>
                <Image id='meun-img' src={costType == 3 ? traffic_select : traffic}></Image>
                <Text className={costType == 3 ? 'type-item-selected' : 'type-item-normal'}>用餐</Text>
              </View>
              <View className='item-view' onClick={() => this.onCostTypeSelected(4)}>
                <Image id='meun-img' src={costType == 4 ? riyongpin_select : riyongpin}></Image>
                <Text className={costType == 4 ? 'type-item-selected' : 'type-item-normal'}>交通</Text>
              </View>
              <View className='item-view' onClick={() => this.onCostTypeSelected(5)}>
                <Image id='meun-img' src={costType == 5 ? yule_select : yule}></Image>
                <Text className={costType == 5 ? 'type-item-selected' : 'type-item-normal'}>日用品</Text>
              </View>
              <View className='item-view' onClick={() => this.onCostTypeSelected(6)}>
                <Image id='meun-img' src={costType == 6 ? lvyou_select : lvyou} ></Image>
                <Text className={costType == 6 ? 'type-item-selected' : 'type-item-normal'}>娱乐</Text>
              </View>
              <View className='item-view' onClick={() => this.onCostTypeSelected(7)}>
                <Image id='meun-img' src={costType == 7 ? qita_select : qita}></Image>
                <Text className={costType == 7 ? 'type-item-selected' : 'type-item-normal'}>旅游</Text>
              </View>
            </View>
            :
            <View className='cost-type-view'>
              <View className='item-view'>
                <Image id='meun-img' src={costType == 8 ? yiban1_select : yiban1}
                       onClick={() => this.onCostTypeSelected(8)}></Image>
                <Text className={costType == 8 ? 'type-item-selected' : 'type-item-normal'}>一般</Text>
              </View>
              <View className='item-view' onClick={() => this.onCostTypeSelected(9)}>
                <Image id='meun-img' src={costType == 9 ? gongzi_select : gongzi}></Image>
                <Text className={costType == 9 ? 'type-item-selected' : 'type-item-normal'}>工资</Text>
              </View>
              <View className='item-view' onClick={() => this.onCostTypeSelected(10)}>
                <Image id='meun-img' src={costType == 10 ? hongbao_select : hongbao}></Image>
                <Text className={costType == 10 ? 'type-item-selected' : 'type-item-normal'}>红包</Text>
              </View>
              <View className='item-view' onClick={() => this.onCostTypeSelected(11)}>
                <Image id='meun-img' src={costType == 11 ? jiangjinguize_select : jiangjinguize}></Image>
                <Text className={costType == 11 ? 'type-item-selected' : 'type-item-normal'}>奖金</Text>
              </View>
              <View className='item-view' onClick={() => this.onCostTypeSelected(12)}>
                <Image id='meun-img' src={costType == 12 ? ziyuan_select : ziyuan}></Image>
                <Text className={costType == 12 ? 'type-item-selected' : 'type-item-normal'}>投资</Text>
              </View>
              <View className='item-view' onClick={() => this.onCostTypeSelected(13)}>
                <Image id='meun-img' src={costType == 13 ? baoxiao_select : baoxiao}></Image>
                <Text className={costType == 13 ? 'type-item-selected' : 'type-item-normal'}>报销</Text>
              </View>
              <View className='item-view' onClick={() => this.onCostTypeSelected(14)}>
                <Image id='meun-img' src={costType == 14 ? qita_select : qita}></Image>
                <Text className={costType == 14 ? 'type-item-selected' : 'type-item-normal'}>其他</Text>
              </View>
            </View>
        }


        <View id='item-space'/>
        <AtTextarea
          id='cost-desc'
          cursor={this.state.desc.length}
          value={this.state.desc}
          onChange={this.handleDescChange.bind(this)}
          maxLength={200}
          placeholder='添加备注...'
        />
        <View id='item-space'/>
        <AtButton type='primary' onClick={() => this.handleClick()}>记 一 笔</AtButton>
      </View>
    )
  }
}
