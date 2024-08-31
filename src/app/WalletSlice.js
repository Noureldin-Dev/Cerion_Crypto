import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'wallet',
  initialState: {
    value: null,
  },
  reducers: {

    disconnect: (state) => {
      state.value = null
      return state
    },
    setWallet: (state, action) => {
      state.value = action.payload
      console.log(state.value)
      return state

    },
  },
})

// Action creators are generated for each case reducer function
export const {  disconnect, setWallet } = counterSlice.actions

export default counterSlice.reducer