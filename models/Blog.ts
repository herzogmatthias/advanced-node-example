import mongoose, { Schema } from "mongoose";
import { IBlog } from "../interfaces/IBlog";

const blogSchema = new Schema<IBlog>({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model<IBlog>("Blog", blogSchema);
