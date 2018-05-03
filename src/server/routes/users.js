const Router = require('koa-router');

const router = new Router();
const User = require('../models/User');

router.get('/users/:id', async (ctx) => {
  const user = await User.query().findById(ctx.params.id);

  ctx.body = user;
});

module.exports = router;
