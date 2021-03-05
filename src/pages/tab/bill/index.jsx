import React, {Component} from 'react'
import {View, Text} from '@tarojs/components'
import './index.less'
import {Pie} from '@ant-design/charts';

export default class Index extends Component {


  constructor(props) {
    super(props);
    this.state = {
      pieConfig: {
        appendPadding: 10,
        data: [],
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
          type: 'inner',
          offset: '-50%',
          content: '{value}',
          style: {
            textAlign: 'center',
            fontSize: 14,
          },
        },
        interactions: [{type: 'element-selected'}, {type: 'element-active'}],
        statistic: {
          title: false,
          content: {
            style: {
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            formatter: function formatter() {
              return '账单\n统计';
            },
          },
        },
      }
    }
  }

  componentDidMount() {
    let config = this.state.pieConfig
    config.data = [
      {
        type: '分类一',
        value: 27,
      },
      {
        type: '分类二',
        value: 25,
      },
      {
        type: '分类三',
        value: 18,
      },
      {
        type: '分类四',
        value: 15,
      },
      {
        type: '分类五',
        value: 10,
      },
      {
        type: '其他',
        value: 5,
      },
    ]

    this.setState({
      pieConfig:config
    })

  }

  render() {

    let{pieConfig} = this.state
    return (
      <View className='index'>
        <Text>sdfafsadfsdadfsfdsfdsfsd</Text>
        <Pie {...pieConfig} />
      </View>
    )
  }
}
