const Koa = require('koa');
const koaBodyParser = require('koa-bodyparser');
const koaSession = require('koa-session');
const passport = require('koa-passport');
const serve = require('koa-static');
const path = require('path');
// routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const combineRouters = require('koa-combine-routers');

const app = new Koa();

app.use(koaBodyParser());

if (process.env.NODE_ENV === 'production') {
  app.use(serve(path.join(__dirname, '../../build')));
}

// session
app.keys = ['tabotify:sesh'];
app.use(koaSession(app));

require('./auth');

// routes
const router = combineRouters([indexRoutes, authRoutes, userRoutes]);
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

const PORT = process.env.PORT || 8081;

const server = app.listen(PORT).on('error', (err) => {
  console.error(err);
});

module.exports = server;
