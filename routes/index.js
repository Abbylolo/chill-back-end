const express = require("express");
const router = express.Router();

router.use("/user", require("./user")); // /sys是前缀 可以通过use加
router.use("/common", require("./common"));

module.exports = router;
//index.js文件是将其他接口总结起来，方便调用
