const Koa = require('koa');
const koaBodyParser = require('koa-bodyparser');
const koaSession = require('koa-session');
const passport = require('koa-passport');

// routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const combineRouters = require('koa-combine-routers');

const app = new Koa();

app.use(koaBodyParser());
app.use(koaSession(app));
// static file serve
app.keys = [process.env.SESSION_SECRET];
require('./auth');

const router = combineRouters([indexRoutes, authRoutes]);
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

const PORT = process.env.PORT || 8081;
const server = app.listen(PORT).on('error', (err) => {
  console.error(err);
});

module.exports = server;
