import { createSlice } from "@reduxjs/toolkit";

export const global = createSlice({
  name: "global",
  initialState: {
    logged: 0,
    currentUser: {
      // Name,
      // FamilyName,
      // Email,
      // PromoCode,
      // PhoneNumber,
      // PhoneNumber,
      // Country,
      // City,
      // Street,
      // ZipCode
    }
  },
  reducers: {
    setLogged: (state, action) => {
      state.logged = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    }
  },
});

export const { setLogged } = global.actions;
export const { setCurrentUser } = global.actions;

export const logged = (state) => state.logged;
export const currentUser = (state) => state.currentUser;

export default global.reducer;
