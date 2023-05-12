const express = require("express");
const router = express.Router();
const {
  addPost,
  getUserPostList,
  deletePost,
  likePost,
  getPostByPostId,
  editPost,
} = require("../controller/controller");
const { vertifyAddPost } = require("../middleware/middleware");

router.post("/add", vertifyAddPost, addPost);
router.post("/getUserPostList", getUserPostList);
router.post("/deletePost", deletePost);
router.post("/likePost", likePost);
router.post("/getPostDetail", getPostByPostId);
router.post("/editPost", vertifyAddPost, editPost);

module.exports = router;
