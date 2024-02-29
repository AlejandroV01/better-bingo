import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ITime {
  stateTime: number
}
const initialState: ITime = {
  stateTime: 0,
}

export const stopwatchSlice = createSlice({
  name: 'stopwatch-state',
  initialState,
  reducers: {
    updateTime: (state, action: PayloadAction<ITime>) => {
      state.stateTime = action.payload.stateTime
    },
    resetTime: state => {
      state.stateTime = 0
    },
  },
})

export const { updateTime, resetTime } = stopwatchSlice.actions

export default stopwatchSlice.reducer
