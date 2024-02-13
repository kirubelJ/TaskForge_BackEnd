const express = require("express");
router = express.Router();
//
const {
  AddUser,
  AddIssue,
  getAllIssue,
  getAllUser,
  deleteUser,
} = require("../Controllers/controller");
//
router.post("/v1/user/add", AddUser);
router.post("/v1/issue/add", AddIssue);
router.get("/v1/user/getall", getAllUser);
router.get("/v1/issue/getall", getAllIssue);
router.delete("/v1/deleteUser/:id", deleteUser);
//
module.exports = router;
