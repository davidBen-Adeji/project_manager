const express = require("express");

const requireAuth = require("../middleware/requireAuth");

const {
  loginUser,
  signupUser,
  changeTheme,
} = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

router.patch("/:email", requireAuth, changeTheme);

module.exports = router;
