import { Component } from 'react'
import './app.less'
import './utils/initBmob'
class App extends Component {

  async componentDidMount() {
    let result = await window.bmob.Query('dd').get("VS0xNNNr");
    console.log(result)
    if (result != null) {
      this.setState({

      })
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
