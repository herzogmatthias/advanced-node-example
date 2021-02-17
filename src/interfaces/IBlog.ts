import { Schema, Document } from "mongoose";
import { IUser } from "./IUser";

export default interface IBlog extends Document {
  title: string;
  content: string;
  imageUrl: string;
  createdAt: { type: Date; default: () => number };
  _user: IUser["_id"];
}
