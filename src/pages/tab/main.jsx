import Taro from '@tarojs/taro'
import React, {Component} from 'react'
// eslint-disable-next-line no-unused-vars
import {Text, View, Image} from "@tarojs/components";
import "taro-ui/dist/style/components/tab-bar.scss" // 按需引入
import './style.less'
import Home from "./home";
import Data from "./data";
import My from "./my";


export default class Main extends Component {


  constructor(props) {
    super(props);
    this.state = {
      pagesIndex: 0,
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
            {/*<Image src={icKb}></Image>*/}
            <Text>
              首页
            </Text>
          </View>

          <View className='bottom-item' onClick={() => this.selectIndex(1)}>
            {/*<Image src={icKb}></Image>*/}

            <Text>
              记账
            </Text>
          </View>

          <View className='bottom-item' onClick={() => this.selectIndex(2)}>
            {/*<Image src={icKb}></Image>*/}

            <Text>
              我的
            </Text>
          </View>
        </View>

      </View>
    )
  }
}
