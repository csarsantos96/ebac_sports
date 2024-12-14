import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Produtos from './containers/Produtos'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Produtos />
    </Provider>
  )
}

export default App
