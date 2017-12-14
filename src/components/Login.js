import { Dialog, Spinner, Intent } from '@blueprintjs/core'
import store from 'store'
export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.setUsername = e => {
      this.setState({ username: e.target.value })
    }
    this.setPassword = e => {
      this.setState({ password: e.target.value })
    }
    this.setName = e => {
      this.setState({ name: e.target.value })
    }
    this.toggleRegister = () => {
      this.setState({ showRegistration: !this.state.showRegistration })
    }
    this.register = async () => {
      if (this._isMounted) this.setState({ loading: true })
      try {
        await axios.post('/api/register', this.state).then(d => d.data)
        this.toggleRegister()
        await this.login()
      }
      catch (err) {
        this.props.parent.Toast.show({ message: err.response ? err.response.data.error.message || err.response.data.error : err.message, intent: Intent.DANGER })
      }
      if (this._isMounted) this.setState({ loading: false })
    }
    this.login = async () => {
      if (this._isMounted) this.setState({ loading: true })
      try {
        const token = await axios.post('/api/login', this.state).then(d => d.data)
        this.props.parent.setState({ token: token.token })
        store.set('token', token.token)
      }
      catch (err) {
        this.props.parent.Toast.show({ message: err.response ? err.response.data.error.message || err.response.data.error : err.message, intent: Intent.DANGER })
      }
      if (this._isMounted) this.setState({ loading: false })
    }
  }
  componentDidMount() {
    this._isMounted = true
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  render() {
    return (
      <Dialog className='login-dialog' isOpen={true} backdropClassName='login-backdrop' hasBackdrop={false} isCloseButtonShown={false} canEscapeKeyClose={false} canOutsideClickClose={false}>
        <div className='pt-dialog-body fill flex-column'>
          <div className='fill flex-column'>
            <h2 className='flex-row flex-center'>Bobby Tables Bank</h2>
            <h4 className='flex-row flex-center'>Please login to Bobby Tables Bank</h4>
            {
              !this.state.loading && (
                <div className='login-controls flex-column fill'>
                  <input className='pt-input pt-large' type='text' placeholder='Username' value={this.state.username || ''} onChange={this.setUsername} />
                  {
                    this.state.showRegistration && (
                      <input className='pt-input pt-large' type='text' placeholder='Name' value={this.state.name || ''} onChange={this.setName} />
                    )
                  }
                  <input className='pt-input pt-large' type='password' placeholder='Password' value={this.state.password || ''} onChange={this.setPassword} />
                </div>
              )
            }
            {
              this.state.loading && (
                <div className='fill flex-column flex-center login-controls'>
                  <Spinner />
                </div>
              )
            }
          </div>
          <div className='pt-dialog-footer flex-row fill'>
            {
              !this.state.showRegistration && (
                <div className='flex-row fill'>
                  <button className='pt-button pt-icon-endorsed pt-intent-success pt-large fill' disabled={this.state.loading} onClick={this.toggleRegister}>Register</button>
                  <button className='pt-button pt-icon-user pt-intent-primary pt-large fill' disabled={this.state.loading} onClick={this.login}>Login</button>
                </div>
              )
            }
            {
              this.state.showRegistration && (
                <div className='flex-row fill'>
                  <button className='pt-button pt-icon-endorsed pt-intent-success pt-large fill' disabled={this.state.loading} onClick={this.register}>Register</button>
                  <button className='pt-button pt-icon-cross pt-large fill' disabled={this.state.loading} onClick={this.toggleRegister}>Cancel</button>
                </div>
              )
            }
          </div>
        </div>
      </Dialog>
    )
  }
}
