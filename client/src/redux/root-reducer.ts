import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import { userReducer } from "./user/user.reducers";
import { blogReducer } from "./blog/blog.reducers";

export const rootReducer = combineReducers({
  user: userReducer,
  form: reduxForm,
  blog: blogReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
