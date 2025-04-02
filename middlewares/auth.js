const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  // req.user = null;
  // if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) return next();
  // const token = req.headers.authorization.split(" ")[1];
  // const user = getUser(token);
  // req.user = user;
  // return next();
  req.user = null;
  if (!req.cookies.token) return next();
  const token = req.cookies.token;
  const user = getUser(token);
  req.user = user;
  return next();
}

function restrictTo(roles = ['NORMAL']) {
  return function(req, res, next) {
    console.log(req.user.role);
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end('You are not authorized to access this page');
    if (req.user.role) return next();

  }
}

// async function restrictToLoggedInUserOnly(req, res, next) {
//   const userUid = req.headers.authorization;
//   if (!userUid) return res.redirect("/login");
//   const token = userUid.split(" ")[1];
//   const user = getUser(token);
//   if (!user) return res.redirect("/login");
//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   console.log(req.headers);
//   const userUid = req.headers.authorization;
//   const token = userUid.split(" ")[1];
//   const user = getUser(token);
//   req.user = user;
//   next();
// }

module.exports = {
  // restrictToLoggedInUserOnly,
  // checkAuth,
  restrictTo,
  checkForAuthentication
}