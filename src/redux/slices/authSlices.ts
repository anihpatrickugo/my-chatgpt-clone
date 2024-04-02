import AsyncStorage from '@react-native-async-storage/async-storage'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'



type AuthStateProps = {
    user: any | null,
    token?: string | null

}

type ActionProps = {
  payload: object,
  token: string
}

const initialState: AuthStateProps = {
  user: null,
  token: null
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: AuthStateProps, action: PayloadAction<ActionProps>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload;
    },
    logout: (state: AuthStateProps) => {
      state.user = null
      state.token = null

    },
    setToken: (state: AuthStateProps, action: PayloadAction<ActionProps>) => {
      state.token = action.payload.token;
    },
}})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer