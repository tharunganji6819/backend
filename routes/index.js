const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/userController");

router.post("/register", authControllers.Register);
router.post("/login", authControllers.Login);

module.exports = router;
