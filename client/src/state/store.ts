import { configureStore } from '@reduxjs/toolkit'
import stopwatchReducer from './stopwatch/stopwatch.slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      stopwatch: stopwatchReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
