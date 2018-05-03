const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('koa-passport');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.query()
    .findById(id)
    .then(user => done(null, user))
    .catch(error => done(error, null));
});

passport.use(new SpotifyStrategy(
  {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: `${process.env.URL || 'http://localhost:8081'}/callback`,
  },
  (accessToken, refreshToken, profile, done) => {
    const userProfile = {
      name: profile.displayName,
      email: profile.emails[0].value,
      username: profile.id,
      photo: profile.photos[0],
    };

    User.query()
      .upsert(userProfile)
      .where('username', profile.id)
      .then((user) => {
        console.log(user);
        done(null, user);
      })
      .catch((error) => {
        done(error, null);
      });
  },
));

module.exports = passport;
