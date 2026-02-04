import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/userModel.js";

passport.use(new GoogleStrategy(
{
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
async (accessToken, refreshToken, profile, cb) => {
  try {

    const email = profile.emails[0].value;

    let user = await User.findOne({ email });

    if (user) {
      if (!user.googleId) {
        user.googleId = profile.id;
      }

      user.isLoggedIn = true;
      await user.save();

      return cb(null, user);
    }

    user = await User.create({
      googleId: profile.id,
      username: profile.displayName,
      email,
      avatar: profile.photos[0].value,
      isLoggedIn: true,
      isVerified: true
    });

    return cb(null, user);

  } catch (error) {
    return cb(error, null);
  }
}));

export default passport;
