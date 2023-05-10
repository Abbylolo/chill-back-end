const express = require("express");
const router = express.Router();
// 中间件
const { verfyRegister } = require("../middleware/middleware");
// 控制器
const { handleRegister, handleLogin } = require("../controller/controller");

// 用户注册
router.post("/register", verfyRegister, handleRegister);

// 用户登录
router.post("/login", handleLogin);

router.get("/user", (req, res) => {
  res.json({
    status: 200,
    msg: "成功",
    data: {
      username: "zhangsan",
      email: "110@163.com",
    },
  });
});

module.exports = router;
