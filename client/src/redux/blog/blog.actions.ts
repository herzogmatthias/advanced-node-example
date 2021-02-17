import { Dispatch } from "redux";
import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { FETCH_BLOG, FETCH_BLOGS } from "./blog.types";
import { IBlogMap } from "../../interfaces/IBlogMap";
import { IBlog } from "../../interfaces/IBlog";

export const fetchBlog = createAction<IBlog>(FETCH_BLOG);
export const fetchBlogs = createAction<IBlogMap>(FETCH_BLOGS);

export const submitBlogAsync = (
  values: any,
  file: File | null,
  history: any
) => async (dispatch: Dispatch) => {
  const uploadConfig = await axios.get("/api/upload");

  await axios.put(uploadConfig.data.signedUrl, file, {
    headers: {
      "Content-Type": file?.type,
    },
  });

  const res = await axios.post("/api/blogs", {
    ...values,
    imageUrl: uploadConfig.data.key,
  });
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
