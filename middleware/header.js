// 设置响应头的中间件
module.exports = async (ctx, next) => {
  const contextType = 'application/json; chartset=utf-8'
  ctx.set('Context-Type', contextType)
  // 跨域
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE')
  // 设置内层中间件执行
  await next()
}
