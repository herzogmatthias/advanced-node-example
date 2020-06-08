import { Schema, Document } from "mongoose";
import { IUser } from "./IUser";

export interface IBlog extends Document {
  title: string;
  content: string;
  createdAt: { type: Date; default: () => number };
  _user: IUser["_id"];
}
