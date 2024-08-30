import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'wallet',
  initialState: {
    value: null,
  },
  reducers: {

    disconnect: (state) => {
      state.value = null
    },
    setWallet: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {  disconnect, setWallet } = counterSlice.actions

export default counterSlice.reducer