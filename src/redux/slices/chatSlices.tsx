
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type Role = "user" | "model"

export type ChatProps = {
    role: Role,
    parts: { text: string }[]
}

export type HistoryProp= ChatProps[]

type ActionProps = {
  role: Role,
  text: string
}

const initialState: HistoryProp = []


export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChat: (state: HistoryProp, action: PayloadAction<ActionProps>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.push({role: action.payload.role, parts: [{text: action.payload.text}]})
    },
    


    clearChat: (state: HistoryProp )=> {
      state = [] 
    },

    createHistory: (state: HistoryProp, action: PayloadAction<HistoryProp>) => {
      state = action.payload
    }
}})

// Action creators are generated for each case reducer function
export const { addChat, clearChat, createHistory } = chatSlice.actions

export default chatSlice.reducer