import Taro from '@tarojs/taro'
import React, {Component} from 'react'
// eslint-disable-next-line no-unused-vars
import {Text, View, Image} from "@tarojs/components";
import "taro-ui/dist/style/components/tab-bar.scss" // 按需引入
import './style.less'
import Home from "./home";
import Data from "./data";
import My from "./my";
import ic_tab_home_selected from '../../image/ic_tab_home_selected.png'
import ic_tab_home_normal from '../../image/ic_tab_home_normal.png'
import ic_tab_bill_selected from '../../image/ic_tab_bill_selected.png'
import ic_tab_bill_normal from '../../image/ic_tab_bill_normal.png'
import ic_tab_my_selected from '../../image/ic_tab_my_selected.png'
import ic_tab_my_normal from '../../image/ic_tab_my_normal.png'


export default class Main extends Component {


  constructor(props) {
    super(props);
    this.state = {
      pagesIndex: 2,
      pages: [<Home/>, <Data/>, <My/>]
    }

  }


  selectIndex(index) {
    this.setState({
      pagesIndex: index
    })
  }

  render() {
    let {pagesIndex} = this.state
    return (
      <View id='root-view'>

        <View id='top-view'>
          {this.state.pages[pagesIndex]}
        </View>

        <View id='bottom-view'>

          <View className='bottom-item' onClick={() => this.selectIndex(0)}>
            <Image id ='bottom-tab-img' src={pagesIndex == 0 ? ic_tab_home_selected : ic_tab_home_normal}></Image>
            <Text id ={pagesIndex == 0 ?"bottom-tab-text-selected":"bottom-tab-text-normal"}>
              首页
            </Text>
          </View>

          <View className='bottom-item' onClick={() => this.selectIndex(1)}>
            <Image id ='bottom-tab-img' src={pagesIndex == 1 ? ic_tab_bill_selected : ic_tab_bill_normal}></Image>

            <Text id ={pagesIndex == 1 ?"bottom-tab-text-selected":"bottom-tab-text-normal"}>
              记账
            </Text>
          </View>

          <View className='bottom-item' onClick={() => this.selectIndex(2)}>
            <Image id ='bottom-tab-img' src={pagesIndex == 2 ? ic_tab_my_selected : ic_tab_my_normal}></Image>
            <Text id ={pagesIndex == 2 ?"bottom-tab-text-selected":"bottom-tab-text-normal"}>
              我的
            </Text>
          </View>
        </View>

      </View>
    )
  }
}
