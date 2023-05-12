const express = require("express");
const router = express.Router();
const {
  createCircle,
  getAllCircleList,
  changeCircleFans,
} = require("../controller/controller");

router.post("/createCircle", createCircle);
router.post("/getAllCircleList", getAllCircleList);
router.post("/changeCircleFans", changeCircleFans);

module.exports = router;
