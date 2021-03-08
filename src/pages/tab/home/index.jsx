import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import {Text, View, Image, Picker} from "@tarojs/components";
import "taro-ui/dist/style/components/action-sheet.scss";
import './style.less'
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

const typeList = [
  {"label": "其他(支出)", "value": 0},
  {"label": "学习", "value": 1},
  {"label": "一般(支出)", "value": 2},
  {"label": "用餐", "value": 3},
  {"label": "交通", "value": 4},
  {"label": "日用品", "value": 5},
  {"label": "娱乐", "value": 6},
  {"label": "旅游", "value": 7},
  {"label": "一般(收入)", "value": 8},
  {"label": "工资", "value": 9},
  {"label": "红包", "value": 10},
  {"label": "奖金", "value": 11},
  {"label": "投资", "value": 12},
  {"label": "报销", "value": 13},
  {"label": "其他(收入)", "value": 14}
]
export default class Home extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      costType: 0,
      costArray: [],
      dateValue: "2021-3",
      shouru: 0,
      zhichu: 0,
      typePickerArray: []
    }
  }

  handleClick(value) {
    this.setState({
      costType: value
    })
  }

  componentDidMount() {

    let typePickerArray = []
    for (let i = 0; i < typeList.length; i++) {
      typePickerArray.push(typeList[i].label)
    }

    this.setState({typePickerArray: typePickerArray})
    this.initDate();
  }


  initDate() {
    var storageSync = Taro.getStorageSync('userEntity');
    let date = this.state.dateValue
    let query = window.bmob.Query('CostEntity');
    query.order('-createdAt');
    query.equalTo("userId", "==", storageSync.objectId);
    query.find().then(res => {
      let temp = res.filter(item => parseInt(item.createdAt.split(" ")[0].split('-')[1]) == (date.split("-")[1]))

      let zhichu = 0;
      let shouru = 0;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].moneyType == 1) {
          shouru += temp[i].number
        } else {
          zhichu += temp[i].number
        }
      }

      let grouped = this.groupBy(temp, item => item.createdAt.split(" ")[0])

      this.setState({
        costArray: grouped,
        shouru: shouru,
        zhichu: zhichu
      })
    });
  }


  async onDateChange(date) {
    await this.setState({dateValue: date.detail.value})
    this.initDate()
  }

  onTypeChange(data) {
    var storageSync = Taro.getStorageSync('userEntity');
    this.setState({costType: data, showTypeDialog: false})
    let date = this.state.dateValue
    let query = window.bmob.Query('CostEntity');
    query.order('-createdAt');
    query.equalTo("costType", "==", data);
    query.equalTo("userId", "==", storageSync.objectId);
    query.find().then(res => {

      // if (res.length == 0) return;
      let temp = res.filter(item => parseInt(item.createdAt.split(" ")[0].split('-')[1]) == (date.split("-")[1]))

      let zhichu = 0;
      let shouru = 0;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].moneyType == 1) {
          shouru += temp[i].number
        } else {
          zhichu += temp[i].number
        }
      }

      let grouped = this.groupBy(temp, item => item.createdAt.split(" ")[0])
      this.setState({
        costArray: grouped,
        shouru: shouru,
        zhichu: zhichu
      })
    });
  }


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
      case 8:
        typeInfo = "一般"
        break;
      case 9:
        typeInfo = "工资"
        break;
      case 10:
        typeInfo = "红包"
        break;
      case 11:
        typeInfo = "奖金"
        break;
      case 12:
        typeInfo = "投资"
        break;
      case 13:
        typeInfo = "报销"
        break;
      case 14:
        typeInfo = "其他"
        break;
    }

    return typeInfo
  }


  goDetailPage(item) {
    Taro.navigateTo({
      url: '/pages/detail/index?id=' + item.objectId
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
      case 8:
        img = yiban1_select
        break;
      case 9:
        img = gongzi_select
        break;
      case 10:
        img = hongbao_select
        break;
      case 11:
        img = jiangjinguize_select
        break;
      case 12:
        img = ziyuan_select
        break;
      case 13:
        img = baoxiao_select
        break;
      case 14:
        img = qita_select
        break;
    }
    return img
  }


  groupBy(array, fn) {
    let groups = {}

    array.forEach(o => {
      let group = JSON.stringify(fn(o))
      groups[group] = groups[group] || []
      groups[group].push(o)
    })

    return Object.keys(groups).map(group => groups[group])
  }


  getMonthMoneyInfo(array) {

    let zhichu = 0;
    let shouru = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i].moneyType == 1) {
        shouru += array[i].number
      } else {
        zhichu += array[i].number
      }
    }

    return "收入" + shouru + " " + "支出" + zhichu
  }


  render() {

    let {costArray, dateValue, costType, shouru, zhichu} = this.state

    return (
      <View className='home-root'>

        <View className='home-top-view'>
          <Picker mode='selector' onChange={e=>this.onTypeChange(e.detail.value)} range={this.state.typePickerArray}>
            <View className='bill-type'>
              <Text>{typeList[costType].label}</Text>
              <Text>▼</Text>
            </View>
          </Picker>
          <View className='bill-data'>
            <Picker mode='date' onChange={date => this.onDateChange(date)} fields='month'>
              <View className='top-item'>
                <Text>{dateValue.split("-")[0]}</Text>
                <Text>▼</Text>
                <Text>{dateValue.split("-")[1]}月</Text>
              </View>
            </Picker>
            <View className='top-item'>
              <Text>月支出</Text>
              <Text>{zhichu}</Text>
            </View>
            <View className='top-item'>
              <Text>月收入</Text>
              <Text>{shouru}</Text>
            </View>
            <View className='top-item'>
              <Text>结余</Text>
              <Text>{shouru - zhichu}</Text>
            </View>

          </View>
        </View>
        {
          (costArray || []).map((array, index) => {
            return <View>
              <View className='view-item-tilte'>
                <Text>{array[0].createdAt.split(" ")[0]}</Text>
                <Text>{this.getMonthMoneyInfo(array)}</Text>
              </View>
              {
                (array || []).map((item, index) => {
                  return <View className='view-shouru' onClick={() => this.goDetailPage(item)}>
                    <View className='item-content-view'>
                      <Image className='shouru-item-icon' src={this.getImgType(item.costType)}/>
                      <Text className='home-item-title'>{this.getCostType(item.costType)}</Text>
                      <Text
                        className={item.moneyType == 0 ? 'item-money-count-shouru' : 'item-money-count-zhichu'}>{item.number}</Text>
                    </View>

                    <View className='item-bottom-view'/>

                  </View>
                })
              }
            </View>
          })
        }

      </View>

    )
  }
}
