const express = require("express");
const router = express.Router();

router.use("/sys", require("./app")); // /sys是前缀 可以通过use加
router.use(require("./users"));

module.exports = router;
//index.js文件是将其他接口总结起来，方便调用

/* GET home page. */
/* router.get("/", function (req, res, next) {
  res.render("index", { title: "chill" });
}); */
