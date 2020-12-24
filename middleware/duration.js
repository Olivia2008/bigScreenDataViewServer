// 服务器的耗时时长
module.exports = async (ctx, next) => {
  // start
  const start = Date.now()
  // 内层中间件开始执行
  await next()
  // end
  const end = Date.now()
  // 设置响应头X-Response-Time
  const duration = end - start
  ctx.set('X-Response-Time', duration + 'ms')
}