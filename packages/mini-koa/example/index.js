 
const Koa = require('../dist').default;
const { Router } = require('../dist');
const controller = require('./controller');

const app = new Koa();
const router = new Router();

controller(router);

app.use(async (ctx, next) => {
  console.info(1);
  await next();
  console.info(4);
});

app.use(async (ctx, next) => {
  console.info(2);
  await next();
  console.info(3);
});

app.use(router.routes());

app.listen(3001, () => {
  console.info('server listen on 3001');
});
