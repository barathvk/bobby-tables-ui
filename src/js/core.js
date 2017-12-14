import '@blueprintjs/core/dist/blueprint.css'
import '../css/style.sass'
import ReactDOM from 'react-dom'
import App from '../components/App'
import { AppContainer } from 'react-hot-loader'
const render = async () => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('main')
  )
  console.log('%c Oh, yes. Little Bobby Tables, we call him', 'color:green; font-weight:bold;')
  console.log(`%c https://xkcd.com/327?base64=${btoa('select id,username from users where username = \'${username}\' and password=\'${password}\'')}`, 'color: blue; font-weight: bold;')
  console.log('%c //TODO fix the login query', 'color:green; font-weight:bold;')
}
render()
if (module.hot) {
  module.hot.accept(() => render())
}
