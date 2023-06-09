import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  nombre: "",
  id: "",
};
export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    createConfig: (state, action) => {
      return action.payload},
    updateConfig:(state,action)=>{
      const res={...state,...action.payload};
      return res
    },
    resetConfig:()=>{
      return initialState;
    }
  },
});
export const {createConfig,updateConfig,resetConfig} = configSlice.actions;
export default configSlice.reducer;
