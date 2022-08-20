const controller = router => {
  router.get('/router', async (ctx) => {
    ctx.body = `[${ctx.request.method}] this response from router`;
  });

  router.post('/router', async (ctx) => {
    ctx.body = `[${ctx.request.method}] this response from router`;
  });
}

module.exports = controller;