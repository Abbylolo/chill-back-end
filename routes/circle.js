const express = require("express");
const router = express.Router();
const {
  createCircle,
  getAllCircleList,
  changeCircleFans,
  getCirclePostList,
  updateCircle,
  getCircleDetail,
  deleteCircle,
} = require("../controller/controller");

router.post("/createCircle", createCircle);
router.post("/deleteCircle", deleteCircle);
router.post("/getAllCircleList", getAllCircleList);
router.post("/changeCircleFans", changeCircleFans);
router.post("/getCirclePostList", getCirclePostList);
router.post("/updateCircle", updateCircle);
router.post("/getCircleDetail", getCircleDetail);

module.exports = router;
