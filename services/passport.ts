import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { getKeys } from "../config/keys";
import * as UserSchema from "../models/User";
const keys = getKeys()!;
const User = UserSchema.default;

passport.serializeUser<any, any>((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new Strategy(
    {
      callbackURL: "/auth/google/callback",
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(undefined, existingUser);
        }
        const user = await new User({
          googleId: profile.id,
          displayName: profile.displayName,
        }).save();
        done(undefined, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
