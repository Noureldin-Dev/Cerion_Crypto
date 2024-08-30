import { configureStore } from '@reduxjs/toolkit'
import WalletReducer from "./WalletSlice"


export default configureStore({
  reducer: {
    wallet:WalletReducer
  },
})