import { Strategy as SpotifyStrategy } from 'passport-spotify';
import passport from 'koa-passport';
import User from '../models/User';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.query()
    .findById(id)
    .then((user) => {
      done(null, user);
    });
});

passport.use(new SpotifyStrategy(
  {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackUrl: process.env.CALLBACK_URL,
  },
  (accessToken, refreshToken, profile, done) => {
    const userProfile = {
      name: profile.displayName,
      email: profile.emails[0].value,
      username: profile.id,
      accessToken,
      photo: profile.photos[0],
    };
    User.query()
      .upsert(userProfile)
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        done(error, null);
      });
  },
));

export default passport;
