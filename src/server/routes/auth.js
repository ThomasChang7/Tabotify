const Router = require('koa-router');
const passport = require('koa-passport');

const router = new Router();

router.get('/login', async (ctx) => {
  ctx.redirect('/auth/spotify');
});

router.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: 'user-read-email  playlist-modify-private',
    showDialog: true,
  }),
);

router.get(
  '/callback',
  passport.authenticate('spotify', {
    failureRedirect: '/login',
    successRedirect: '/',
  }),
  async (ctx) => {
    ctx.redirect('/');
  },
);

router.get('/logout', async (ctx) => {
  ctx.logout();
  ctx.redirect('/');
});

module.exports = router;
