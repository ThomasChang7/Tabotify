var Koa = require('koa');
var koaBodyParser = require('koa-bodyparser');
var koaSession = require('koa-session');
var passport = require('koa-passport');

// routes
var indexRoutes = require('./routes/index');
var authRoutes = require('./routes/auth');
var userRoutes = require('./routes/users');
var combineRouters = require('koa-combine-routers');

var app = new Koa();

app.use(koaBodyParser());
app.keys = ['tabotify:sesh'];
app.use(koaSession(app));

require('./auth');

var router = combineRouters([indexRoutes, authRoutes, userRoutes]);
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

var PORT = process.env.PORT || 8081;

var server = app.listen(PORT).on('error', function (err) {
  console.error(err);
});

module.exports = server;
//# sourceMappingURL=index.js.map