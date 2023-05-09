const { insertUserByUsername } = require("../services/services");

class appController {
  // 处理注册的业务逻辑
  async handleRegister(req, res) {
    // 1、获取前端传过来的数据
    // 2、校验注册信息是否存在，不存在return
    // 3、从数据库校验用户是否注册过
    // 4、保存进数据库
    const { username, password } = req.body;
    try {
      await insertUserByUsername(username, password);
      res.json({
        code: 200,
        msg: "注册成功",
      });
    } catch (error) {
      res.status(500).send("服务器出问题了");
    }
  }
}

//appController是一个类，所以需要new一个实例对象出来
module.exports = new appController();
