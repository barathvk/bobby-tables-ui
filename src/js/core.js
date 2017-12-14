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
}
render()
if (module.hot) {
  module.hot.accept(() => render(store))
}
