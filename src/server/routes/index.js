const Router = require('koa-router');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = {
    data: 'Sending some JSON',
  };
});

module.exports = router;
