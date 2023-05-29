const express = require("express");
const router = express.Router();
const logoutController = require("../controllers/logoutController");

router.get("/", logoutController.handleLogut);

module.exports = router;
