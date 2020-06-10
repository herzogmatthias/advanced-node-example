import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

const userSchema = new Schema<IUser>({
  googleId: String,
  displayName: String,
});

export default mongoose.model<IUser>("User", userSchema);
