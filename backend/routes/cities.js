const express = require("express");
const router = express.Router();
const { getList } = require("../controller/cities");

router.get("/list", getList);

module.exports = router;
