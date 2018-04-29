const Koa = require('koa');
const koaBodyParser = require('koa-bodyparser');
const koaSession = require('koa-session');
const passport = require('./auth');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

const app = new Koa();
app.use(koaBodyParser);
app.use(koaSession);
// static file serve
app.keys = [process.env.SESSION_SECRET];
app.use(passport);
const PORT = process.env.PORT || 8081;
app.use(passport.initialize());
app.use(passport.session());
app.use(indexRoutes.routes());
app.use(authRoutes.routes());
const server = app.listen(PORT).on('error', (err) => {
  console.error(err);
});

module.exports = server;
