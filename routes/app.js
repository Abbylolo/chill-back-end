const express = require("express");
const router = express.Router();
// 中间件
const { verfyRegister } = require("../middleware/middleware");
// 控制器
const { handleRegister } = require("../controller/controller");

//用户注册
router.post("/register", verfyRegister, handleRegister);

router.post("/login", (req, res) => {
  res.json({
    code: 200,
    msg: "登录成功",
  });
});

module.exports = router;
