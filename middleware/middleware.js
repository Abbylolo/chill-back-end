const db = require("../services/services");

//校验注册的中间件
const verfyRegister = async (req, res, next) => {
  const { username, password, brief } = req.body;
  if (!username || !password) {
    res.json({
      status: "-1",
      msg: "用户名和密码必填",
    });
    return;
  } else if (username.length > 10) {
    res.json({
      status: "-1",
      msg: "用户名不得超过10个字",
    });
    return;
  } else if (password.length > 12) {
    res.json({
      status: "-1",
      msg: "密码不得超过12位数",
    });
    return;
  } else if (brief.length > 50) {
    res.json({
      status: "-1",
      msg: "简介不得超过50个字",
    });
  }
  try {
    //查询数据库，查询用户在数据库中是否存在
    const dbRes = await db.getUserByUsername(username);
    if (dbRes.length !== 0) {
      res.send({
        status: "-1",
        msg: "该用户已注册，请登录",
      });
      return;
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).send("服务器出问题了");
    return;
  }
  next();
};

module.exports = {
  verfyRegister,
};
