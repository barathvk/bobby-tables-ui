import { Spinner, Menu, MenuItem, Intent } from '@blueprintjs/core'
import store from 'store'
import _ from 'lodash'
export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.logout = () => {
      this.props.parent.setState({ token: null })
      store.remove('token')
    }
    this.setAmount = e => {
      this.setState({ amount: parseInt(e.target.value) })
    }
    this.selectUser = u => {
      this.setState({ to: u.username })
    }
    this.update = async () => {
      const user = await this.api.get(`/user/${this.state.username}`).then(d => d.data)
      const users = await this.api.get('/user').then(d => d.data)
      this.setState({ user, users: users.filter(u => u.id !== user.id) })
    }
    this.transfer = async () => {
      try {
        await this.api.post('/transfer', this.state).then(d => d.data)
        this.setState({ amount: null, to: null })
        await this.update()
      }
      catch (err) {
        this.props.parent.Toast.show({ message: err.response ? err.response.data.error.message || err.response.data.error : err.message, intent: Intent.DANGER })
      }
    }
  }
  async componentDidMount() {
    this.api = axios.create({
      baseURL: '/api',
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    })
    await this.update()
  }

  render() {
    return (
      <div className='fill flex-column'>
        {
          !this.state.user && (
            <div className='fill flex-center flex-column'><Spinner /></div>
          )
        }
        {
          this.state.user && (
            <div className='fill flex-column'>
              <nav className='pt-navbar pt-dark pt-fixed-top'>
                <div className='pt-navbar-group pt-align-left'>
                  <div className='pt-navbar-heading'><span className='pt-icon-standard pt-icon-euro' /> Bobby Tables Bank</div>
                </div>
                <div className='pt-navbar-group pt-align-right'>
                  <div className="pt-navbar-heading flex-row flex-center-align">
                    <span className='pt-icon-standard pt-icon-user' />
                    {this.state.user.name}
                  </div>
                  <button className='pt-button pt-minimal pt-icon-log-out' onClick={this.logout} />
                </div>
              </nav>
              <div className='fill flex-column flex-center'>
                <div className='flex-row balance-wrapper pt-card pt-elevation-3'>
                  <div className='fill flex-column flex-center balance-show'>
                    <h1>Current Balance</h1>
                    <span className='balance'>€{this.state.user.balance}</span>
                  </div>
                  <div className='flex-column transfer'>
                    <h1 style={{ textAlign: 'center' }}>Transfer</h1>
                    <h4 style={{ textAlign: 'center' }}>Transfer To</h4>
                    <div className='fill flex-column menu'>
                      <Menu className='users'>
                        {
                          _.sortBy(this.state.users, u => u.name).map(u => {
                            return (
                              <MenuItem intent={Intent.PRIMARY} key={u.id} iconName='user' onClick={this.selectUser.bind(this, u)} text={u.name} label={this.state.to === u.username ? <span className='pt-icon-standard pt-icon-endorsed' /> : <span />} />
                            )
                          })
                        }
                      </Menu>
                    </div>
                    <div className="pt-input-group pt-large flex-row flex-center-align">
                      <span className="pt-icon pt-icon-euro" />
                      <input type="text" className="pt-input" placeholder='Amount' value={this.state.amount || ''} onChange={this.setAmount} />
                    </div>
                    <button className='pt-button pt-intent-primary pt-large pt-icon-exchange' disabled={!this.state.amount || !this.state.to} onClick={this.transfer}>Transfer</button>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}
