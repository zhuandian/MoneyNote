import React, {Component} from 'react'
import {View, Text, Image, Picker} from '@tarojs/components'
import './index.less'
import baoxiao_select from "../../image/baoxiao_select.png";
import gongzi_select from "../../image/gongzi_select.png";
import hongbao_select from "../../image/hongbao_select.png";
import jiangjinguize_select from "../../image/jiangjinguize_select.png";
import lvyou_select from "../../image/lvyou_select.png";
import qita_select from "../../image/qita_select.png";
import riyongpin_select from "../../image/riyongpin_select.png";
import traffic_select from "../../image/traffic_select.png";
import xuexi_select from "../../image/xuexi_select.png";
import yiban_select from "../../image/yiban_select.png";
import yiban1_select from "../../image/yiban_1_select.png";
import yongcan_select from "../../image/yongcanqu_select.png";
import yule_select from "../../image/yule_select.png";
import ziyuan_select from "../../image/ziyuan_select.png";
import Taro from "@tarojs/taro";

import F2Canvas from '../../components/F2Canvas/F2Canvas'

import F2 from "@antv/f2/lib/index-all";

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


var chartMy = null
export default class Index extends Component {


  constructor(props) {
    super(props);
    this.state = {
      costType: 0,
      moneyType: 0,
      costArray: [],
      dateValue: "2021-3",
      shouru: 0,
      zhichu: 0,
      showTypeDialog: false,
      showDatePicker: false,
      pieData: [{
        const: 'const',
        type: '其他',
        money: 51.39
      }]
      ,
    }
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

  getCostType(type) {
    let typeInfo = "其他"
    switch (type) {
      case 0:
        typeInfo = "其他"
        break;
      case 1:
        typeInfo = "学习"
        break;
      case 2:
        typeInfo = "一般"
        break;
      case 3:
        typeInfo = "用餐"
        break;
      case 4:
        typeInfo = "交通"
        break;
      case 5:
        typeInfo = "日用品"
        break;
      case 6:
        typeInfo = "娱乐"
        break;
      case 7:
        typeInfo = "旅游"
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
      case 15:
        typeInfo = "全部"
    }

    return typeInfo
  }


  async onDateChange(date) {
    await this.setState({dateValue: date.detail.value})
    this.initDate()
  }


  initDate() {
    let date = this.state.dateValue

    var storageSync = Taro.getStorageSync('userEntity');
    let query = window.bmob.Query('CostEntity');
    query.order('-createdAt');
    query.equalTo("moneyType", "==", this.state.moneyType);
    query.equalTo("userId", "==", storageSync.objectId);
    query.find().then(async res => {
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
      let grouped = this.groupBy(temp, item => item.costType)

      console.log(grouped)


      let pieData = [];
      for (let i = 0; i < grouped.length; i++) {
        let totalCount = 0;
        for (let j = 0; j < grouped[i].length; j++) {
          if (grouped[i][j].moneyType == this.state.moneyType) {
            totalCount += grouped[i][j].number
          }
        }
        pieData.push(
          {
            const: "const",
            type: this.getCostType(grouped[i][0].costType),
            money: totalCount,
          }
        )
      }

      chartMy.changeData(pieData)


      this.setState({
        costArray: temp,
        shouru: shouru,
        zhichu: zhichu,
      })
    });
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

  onInitPie(config) {

    const chart = new F2.Chart(config);
    const data = this.state.pieData;
    chart.source(data);
    chart.coord('polar', {
      transposed: true,
      radius: 0.9,
      innerRadius: 0.5
    });
    chart.axis(false);
    chart.legend(false);
    chart.tooltip(false);
    chart.interval()
      .position('const*money')
      .adjust('stack')
      .color('type', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14']);
    chart.interval()
      .position('const*money')
      .adjust('stack')
      .color('type', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14']);
    chart.pieLabel({
      sidePadding: 30,
      activeShape: true,
      label1: function label1(data) {
        return {
          text: '￥' + data.money,
          fill: '#343434',
          fontWeight: 'bold'
        };
      },
      label2: function label2(data) {
        return {
          text: data.type,
          fill: '#999'
        };
      },
    });
    chart.render();
    chartMy = chart
    this.initDate()
    return chart
  }


  render() {

    let {dateValue, costArray, moneyType} = this.state
    return (
      <View className='bill-root'>

        <View className='top-view'>

          <View className='bill-top-view'>
            <View className='money-type'>
              <Text className={moneyType == 1 ? "selected" : "normal"}
                    onClick={() => this.onMoneyTypeChange(1)}>收入</Text>
              <Text className={moneyType == 0 ? "selected" : "normal"}
                    onClick={() => this.onMoneyTypeChange(0)}>支出</Text>
            </View>
            <Picker mode='date' onChange={date => this.onDateChange(date)} fields='month'>
              <Text className='time'>{dateValue.split("-")[0] + "-" + dateValue.split("-")[1]}</Text>
            </Picker>
          </View>

          <View className='pie-view'>
            <F2Canvas
              id='f2-canvas'
              style="width: 100%; height: 200px;"
              onInit={this.onInitPie.bind(this)}
            />
          </View>
        </View>

        <Text className='rank-title'>{dateValue.split("-")[1]}月份{moneyType == 1 ? "收入" : "支出"}列表明细</Text>

        <View className='bottom-view'>
          {
            (costArray || []).map((item, index) => {
              return <View className='view-shouru'>
                <View className='item-content-view'>
                  <Image className='shouru-item-icon' src={this.getImgType(item.costType)}/>
                  <Text className='home-item-title'>{this.getCostType(item.costType)}</Text>
                  <Text>{item.number}</Text>
                </View>

                <View className='item-bottom-view'></View>

              </View>
            })
          }
        </View>
      </View>
    )
  }

  async onMoneyTypeChange(type) {
    await this.setState({moneyType: type})
    this.initDate()
  }
}
