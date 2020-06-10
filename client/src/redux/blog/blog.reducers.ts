import { createReducer } from "@reduxjs/toolkit";
import { IBlogState } from "./IBlogState";
import { fetchBlog, fetchBlogs } from "./blog.actions";
import mapKeys from "lodash/mapKeys";

const initialState: IBlogState = {
  blogs: {},
};

export const blogReducer = createReducer(initialState, {
  [fetchBlogs.type]: (state, action) => {
    state.blogs = mapKeys(action.payload, "_id");
  },
  [fetchBlog.type]: (state, action) => {
    state.blogs[action.payload._id] = action.payload;
  },
});
