import { Component } from 'react'
import './app.less'
// import 'antd-mobile/lib/picker/style/css'
// import 'antd-mobile/lib/date-picker/style/css'
import './utils/initBmob'
class App extends Component {


  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
