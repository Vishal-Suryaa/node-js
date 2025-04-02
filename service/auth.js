const jwt = require("jsonwebtoken");
const JWT_SECRET = "AWERMKASMK_NKQJDWM_$DMAA";

function setUser(user) {
  const token = jwt.sign({
    _id: user._id,
    email: user.email,
    role: user.role,
  }, JWT_SECRET);
  return token;
}

function getUser(token) {
  if (!token) return null;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    return user;
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};