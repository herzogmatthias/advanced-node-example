import Keygrip from "keygrip";
import { getKeys } from "../../src/config/keys";
import { IUser } from "../../src/interfaces/IUser";

export const createSession = (user: IUser) => {
  const sessionObject = { passport: { user: user._id } };

  const session = Buffer.from(JSON.stringify(sessionObject)).toString("base64");

  const keygrip = new Keygrip([getKeys()!.cookieKey]);
  const sig = keygrip.sign("express:sess=" + session);

  return { sig, session };
};
