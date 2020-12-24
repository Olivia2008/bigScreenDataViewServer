// 服务器入口文件
const Koa = require('koa')
const app = new Koa()

// 绑定中间件
const resDurationMid = require('./middleware/duration')
app.use(resDurationMid)

const resHeaderMid = require('./middleware/header')
app.use(resHeaderMid)

const resDataMid = require('./middleware/data')
app.use(resDataMid)

app.listen(8889)

const websocketService = require("./service/web_socket_service");

websocketService.listen();