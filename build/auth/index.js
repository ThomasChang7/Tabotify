var SpotifyStrategy = require('passport-spotify').Strategy;
var passport = require('koa-passport');
var User = require('../models/User');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.query().findById(id).then(function (user) {
    return done(null, user);
  }).catch(function (error) {
    return done(error, null);
  });
});

passport.use(new SpotifyStrategy({
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: (process.env.URL || 'http://localhost:8081') + '/callback'
}, function (accessToken, refreshToken, profile, done) {
  var userProfile = {
    name: profile.displayName,
    email: profile.emails[0].value,
    username: profile.id,
    photo: profile.photos[0]
  };

  User.query().upsert(userProfile).where('username', profile.id).then(function (user) {
    console.log(user);
    done(null, user);
  }).catch(function (error) {
    done(error, null);
  });
}));

module.exports = passport;
//# sourceMappingURL=index.js.map