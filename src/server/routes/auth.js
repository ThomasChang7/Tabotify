import Router from 'koa-router';
import passport from 'koa-passport';

const router = new Router();

router.get('/login', async (ctx) => {
  ctx.redirect('/auth/spotify');
});

router.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: 'user-read-email user-read-private playlist-modify-public playlist-modify-private',
  }),
);

router.get(
  '/spotify/callback',
  passport.authenticate('spotify', {
    failureRedirect: '/login',
  }),
  async ctx => ctx.redirect('/'),
);

router.get('/logout', async (ctx) => {
  ctx.logout();
  ctx.redirect('/');
});

module.exports = router;
