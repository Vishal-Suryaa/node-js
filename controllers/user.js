const User = require("../models/user");
const { v4: uuidV4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.render("login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  console.log(user);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or passowrd" });
  }
  const token = setUser(user);
  res.cookie("token", token);
  // return res.json({
  //   token,
  // });
  return res.redirect("/");
}

module.exports = { handleUserSignup, handleUserLogin };
