import { IUserState } from "./IUserState";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { fetchUser } from "./user.actions";
import { IUser } from "../../interfaces/IUser";

const initialState: IUserState = {
  user: undefined,
};

export const userReducer = createReducer(initialState, {
  [fetchUser.type]: (state, action: PayloadAction<IUser>) => {
    state.user = action.payload;
  },
});
