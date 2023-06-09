import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./state/user"
import configReducer from "./state/config"

export default configureStore({
  reducer: {
    user: userReducer,
    config: configReducer,
  },
})