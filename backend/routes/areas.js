const express = require("express");
const router = express.Router();
const { getList } = require("../controller/areas");

router.get("/list", getList);

module.exports = router;
