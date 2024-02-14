const express = require("express");
router = express.Router();
//
const {
  AddUser,
  AddIssue,
  getAllIssue,
  getAllUser,
  deleteUser,
  FSE_SignIn,
  getTodayIssues,
} = require("../Controllers/controller");
//
router.post("/v1/user/add", AddUser);
router.post("/v1/user/signin", FSE_SignIn);
router.post("/v1/issue/add", AddIssue);
router.post("/v1/issue/today", getTodayIssues);
router.get("/v1/user/getall", getAllUser);
router.get("/v1/issue/getall", getAllIssue);
router.delete("/v1/deleteUser/:id", deleteUser);
//
module.exports = router;
