const WebSocket = require("ws");
const path = require("path");
const getFileDtaUtil = require("../utils/file");
const ws = new WebSocket.Server({
  port: 8808
});
module.exports.listen = () => {
  ws.on("connection", client => {
    console.log("有客户端连接>>>>>>");
    // msg客户端发给服务端的数据信息
    client.on("message", async msg => {
      console.log("客户端发到服务端的数据：" + msg);
      // 将字符串转化为对象
      const objMsg = JSON.parse(msg);
      if (objMsg.action === "getData") {
        let filePath = "../data/" + objMsg.name + ".json";
        filePath = path.join(__dirname, filePath);
        //getFileJsonData return a Promise
        objMsg.data = await getFileDtaUtil.getFileJsonData(filePath);
        // 服务端发送给客户端的字符串
        client.send(JSON.stringify(objMsg));
      } else {
        // 将接收到的数据转发给每个连接状态的客户端
        ws.clients.forEach(client => {
          client.send(msg);
        });
      }
    });
  });
};