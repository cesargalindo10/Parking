import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email: "",
  accessToken: "",
  rol: "",
  permission:'',
  id: '',
  nombre:''
};
const persistLocalStorage = (key, values) => {
  localStorage.setItem(key, JSON.stringify({ ...values }));
};
const clearLocalStorage = (key) => {
  localStorage.removeItem(key);
};
export const UserKey = "user";
const userSlice = createSlice({
  name: "user",
  initialState: localStorage.getItem(UserKey) ? JSON.parse(localStorage.getItem(UserKey)) : initialState,
  reducers: {
    createUser: (state, action) => {
      persistLocalStorage(UserKey, action.payload);
      return action.payload;
    },
    updateUser: (state, action) => {
      const res = { ...state, ...action.payload };
      persistLocalStorage(UserKey, res);
      return res;
    },
    resetUser: () => {
      clearLocalStorage(UserKey);
      return initialState;
    },
  },
});
export const {createUser,updateUser,resetUser} = userSlice.actions;
export default userSlice.reducer;