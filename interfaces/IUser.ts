import { Document } from "mongoose";

export interface IUser extends Document {
  googleId: string;
  displayName: string;
}
