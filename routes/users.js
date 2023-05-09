const express = require("express");
const router = express.Router();

router.get("/user", (req, res) => {
  res.json({
    code: 200,
    msg: "成功",
    data: {
      username: "zhangsan",
      email: "110@163.com",
    },
  });
});

/* GET users listing. */
/* router.get('/', function(req, res, next) {
  res.send('respond with a resource');
}); */

module.exports = router;
