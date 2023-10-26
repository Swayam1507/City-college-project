const express = require("express");
const router = express.Router();
const { create, remove, edit } = require("../controller/reviews");

router.post("/create", create);
router.delete("/delete/:id", remove);
router.post("/update/:id", edit);

module.exports = router;
