import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userRole: null,
  userPermissions: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    setUserPermissions: (state, action) => {
      state.userPermissions = action.payload;
    },
    resetUser: (state) => {
      state.userRole = null;
      state.userPermissions = [];
    },
  },
});

export const { setUserRole, setUserPermissions, resetUser } = userSlice.actions;
export default userSlice.reducer;
