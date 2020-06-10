import { Dispatch } from "redux";
import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { FETCH_BLOG, FETCH_BLOGS } from "./blog.types";

export const fetchBlog = createAction<any>(FETCH_BLOG);
export const fetchBlogs = createAction<any>(FETCH_BLOGS);

export const submitBlogAsync = (values: any, history: any) => async (
  dispatch: Dispatch
) => {
  const res = await axios.post("/api/blogs", values);
  history.push("/blogs");
  dispatch({ type: FETCH_BLOG, payload: res.data });
};

export const fetchBlogsAsync = () => async (dispatch: Dispatch) => {
  const res = await axios.get("/api/blogs");

  dispatch({ type: FETCH_BLOGS, payload: res.data });
};

export const fetchBlogAsync = (id: string) => async (dispatch: Dispatch) => {
  const res = await axios.get(`/api/blogs/${id}`);

  dispatch({ type: FETCH_BLOG, payload: res.data });
};
