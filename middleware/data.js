const path = require('path')
const fileUtils = require('../utils/file')
module.exports = async (ctx, next) => {
  // http://127.0.0.1:8889/map
  // 地址中输入地址为多少url=/api/map
  const url = ctx.request.url
  // 请求默认/api, 去掉/api
  let filePath = url.replace('/api', '')
  // 连接到项目data中的数据 ../data/map.json
  filePath = '../data' + filePath + '.json'
  // __dirname 是项目的根目录
  filePath = path.join(__dirname, filePath)
  // 如果url不存在，做友好提示
  try {
    // read file context, fileUtils是一个promise,async
    const fileData = await fileUtils.getFileJsonData(filePath)
    // console.log(`fileData: ${fileData}`)
    ctx.response.body = fileData
  } catch (error) {
    const errMsg = {
      message: '文件资源内容不存在',
      status: 404
    }

    // 转化errMsg对象为string
    ctx.response.body = JSON.stringify(errMsg.message)
  }
  await next()
}