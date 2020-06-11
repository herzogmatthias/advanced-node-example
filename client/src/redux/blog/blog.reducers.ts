import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { IBlogState } from "./IBlogState";
import { fetchBlog, fetchBlogs } from "./blog.actions";
import mapKeys from "lodash/mapKeys";
import { IBlogMap } from "../../interfaces/IBlogMap";
import { IBlog } from "../../interfaces/IBlog";

const initialState: IBlogState = {
  blogs: {},
};

export const blogReducer = createReducer(initialState, {
  [fetchBlogs.type]: (state, action: PayloadAction<IBlogMap>) => {
    console.log(action.payload);
    state.blogs = mapKeys(action.payload, "_id");
  },
  [fetchBlog.type]: (state, action: PayloadAction<IBlog>) => {
    state.blogs[action.payload._user] = action.payload;
  },
});
