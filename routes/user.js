const express = require("express");
const router = express.Router();
const User = require("../models/user") ;
router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/signup", (req, res) => {
 return  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  return res.redirect("/");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.matchPassword(email, password);
  if (!user) {
    return res.redirect("/user/login");
  }
  return res.redirect("/");
});

module.exports = router;

