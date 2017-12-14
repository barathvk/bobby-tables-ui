import { Position, Toaster } from '@blueprintjs/core'
import Login from './Login'
import Home from './Home'
import store from 'store'
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.setState({ token: store.get('token') })
    this.Toast = Toaster.create({
      position: Position.TOP_RIGHT
    })
  }
  render() {
    return (
      <div className='fill flex-column pt-app'>
        {
          !this.state.token && (
            <Login parent={this} />
          )
        }
        {
          this.state.token && (
            <Home parent={this} token={this.state.token} />
          )
        }
      </div>
    )
  }
}
