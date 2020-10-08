import { configureStore } from '@reduxjs/toolkit'
import serversSlice from 'state/serversSlice'

const store = configureStore({
    reducer: {
        servers: serversSlice
    }
})

export default store
