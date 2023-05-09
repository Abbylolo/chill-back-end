const { getUserByUsername } = require("../services/services");

//校验注册的中间件
const verfyRegister = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).json({
      code: "-1",
      msg: "用户名和密码必填",
    });
    return;
  }
  try {
    //查询数据库，查询用户在数据库中是否存在
    const dbRes = await getUserByUsername(username);
    console.log("dbRes", dbRess);
    if (dbRes.length !== 0) {
      res.send({
        code: "-1",
        msg: "该用户已注册，请登录",
      });
      return;
    }
  } catch (error) {
    res.status(500).send("服务器出问题了");
    return;
  }
  next();
};

module.exports = {
  verfyRegister,
};
