import React from 'react'
import { Provider } from 'react-redux';
import Home from 'pages/Home'
import { store } from 'helpers/store';
import 'normalize.css'
import 'theme/app.scss'

export const App = () => (
    <Provider store={store({})}>
        <Home />
    </Provider>
)

export default App
