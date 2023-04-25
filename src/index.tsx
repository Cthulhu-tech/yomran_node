import reportWebVitals from './reportWebVitals'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/root'
import React from 'react'

import { App } from './App'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <Provider store={store}>
    <App />
  </Provider>)
reportWebVitals()
