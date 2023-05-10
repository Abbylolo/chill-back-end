const express = require("express");
const router = express.Router();
const multer = require("multer");

// 控制层
const { uploadPic } = require("../controller/controller");

// 图片上传
router.post(
  "/uploadPic",
  multer({
    //设置文件存储路径
    dest: "public/image",
  }).array("file", 9),
  uploadPic
);

module.exports = router;
