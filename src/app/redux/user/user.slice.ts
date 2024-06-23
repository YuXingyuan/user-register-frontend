import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { User, UserState } from "./user.models";

type UserList = {
  userList: User[];
};

const initialState: UserState = {
  userList: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    requestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    requestSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    requestError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getUserListSuccess: (state, action: PayloadAction<UserList>) => {
      state.loading = false;
      state.userList = action.payload.userList.map((user) => {
        return { ...user, selected: false, editMode: false };
      });
      state.error = null;
    },
    toggleSelected: (state, { payload: id }: PayloadAction<string>) => {
      state.userList.forEach((userForm) => {
        if (userForm.id === id) {
          userForm.selected = !userForm.selected;
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  requestStart,
  requestSuccess,
  requestError,
  getUserListSuccess,
  toggleSelected,
} = userSlice.actions;

export default userSlice.reducer;
