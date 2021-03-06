import Taro, {getCurrentInstance} from '@tarojs/taro'
import React, {Component} from 'react'
import {Image, Text, View, Input, Textarea} from "@tarojs/components";
import "taro-ui/dist/style/components/tab-bar.scss" // 按需引入
import './index.less'
import "taro-ui/dist/style/components/tabs.scss";
import baoxiao_select from "../../../../image/baoxiao_select.png";
import gongzi_select from "../../../../image/gongzi_select.png";
import hongbao_select from "../../../../image/hongbao_select.png";
import jiangjinguize_select from "../../../../image/jiangjinguize_select.png";
import lvyou_select from "../../../../image/lvyou_select.png";
import qita_select from "../../../../image/qita_select.png";
import riyongpin_select from "../../../../image/riyongpin_select.png";
import traffic_select from "../../../../image/traffic_select.png";
import xuexi_select from "../../../../image/xuexi_select.png";
import yiban_select from "../../../../image/yiban_select.png";
import yiban1_select from "../../../../image/yiban_1_select.png";
import yongcan_select from "../../../../image/yongcanqu_select.png";
import yule_select from "../../../../image/yule_select.png";
import ziyuan_select from "../../../../image/ziyuan_select.png";

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


export default class Detail extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      current: 0,
      costEntity: null,
      isEditMode:true
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


  render() {
    let {costEntity,isEditMode} = this.state
    return (
      costEntity == null ?
        <View></View>
        :
        <View id='detail-page-root'>
          <View id='item-content-view'>
            <Image id='item-icon' src={this.getImgType(costEntity.costType)}/>
            <Text id='item-info'>{typeList[costEntity.costType].label}</Text>
          </View>
          <View id='item-bottom-view'/>
          <View id='item-content-view'>
            <Text id='item-info'>金额 ：</Text>
            <Input id='bill-count-number' className='item-input' value={costEntity.number} disabled={isEditMode}/>
          </View>
          <View id='item-bottom-view'/>

          <View id='item-content-view'>
            <Text id='item-info'>日期 ：</Text>
            <Text id='item-info'>{costEntity.createdAt}</Text>
          </View>
          <View id='item-bottom-view'/>

          <View id='item-content-view'>
            <Text id='item-info'>备注 ：</Text>
          </View>
          <View id='item-content-view'>
            <Textarea  id='bill-desc' className='item-input' value={costEntity.desc} disabled={isEditMode}/>
          </View>
          <View id='item-bottom-view'/>

          <View id='bottom-btn-view'>
            <Text id='btn' onClick={()=>this.onDeleteEntity(costEntity.objectId)}>删除</Text>
            <Text id='btn' onClick={()=>this.setState({isEditMode:false})}>修改</Text>
          </View>

          <View id='bottom-btn-view'>
            <Text id='btn' hidden={isEditMode} onClick={()=>this.onSaveNewDate(costEntity)}>保存</Text>
          </View>

        </View>
    )
  }

  onDeleteEntity(objectId) {
    const query = Bmob.Query('CostEntity');
    query.destroy(objectId).then(res => {
      Taro.showLoading({
        title: '删除成功...',
      })
      Taro.navigateBack()
    }).catch(err => {
      Taro.showToast({
        title: '删除失败...',
      })
    })
  }

  onSaveNewDate(costEntity) {
    let billCountNumber = document.getElementById('bill-count-number').value
    let billDesc = document.getElementById('bill-desc').value

    const query = Bmob.Query('CostEntity');
    query.set('id', costEntity.objectId) //需要修改的objectId
    query.set('number', parseInt(billCountNumber))
    query.set('desc', billDesc)
    query.save().then(res => {
      Taro.showToast({
        title: '修改成功...',
      })

      this.setState({isEditMode:true})
    }).catch(err => {
      Taro.showToast({
        title: '修改失败...',
      })
    })
  }
}
