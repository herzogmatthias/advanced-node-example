import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  googleId: string;
  displayName: string;
}
