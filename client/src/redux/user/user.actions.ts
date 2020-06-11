import { createAction, Dispatch } from "@reduxjs/toolkit";
import { FETCH_USER } from "./user.types";
import axios from "axios";
import { IUser } from "../../interfaces/IUser";

export const fetchUser = createAction<IUser>(FETCH_USER);

export const fetchUserAsync = () => async (dispatch: Dispatch) => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};
