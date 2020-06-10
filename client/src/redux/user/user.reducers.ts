import { IUserState } from "./IUserState";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { fetchUser } from "./user.actions";

const initialState: IUserState = {
  user: undefined,
};

export const userReducer = createReducer(initialState, {
  [fetchUser.type]: (state, action) => {
    state.user = action.payload;
  },
});
