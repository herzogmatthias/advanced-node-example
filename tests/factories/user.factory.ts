import { IUser } from "../../src/interfaces/IUser";
import { model } from "mongoose";

export const createUser = () => {
  const User = model<IUser>("User");

  return new User({}).save();
};
