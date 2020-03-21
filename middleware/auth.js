const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler');
const User = require('../models/User')



const protect = asyncHandler(async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ success: false, code: 401, message: "missing auth token | Access Denied" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded._id);
  if (!user) {
    return res
      .status(401)
      .send({ success: false, code: 401, message: "invalid user id in token // Access Denied" });
  }

  req.user = user
  next();
})

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send({ success: false, code: 403, message: `role ${req.user.role} is not authorized to access this route` })
    }
    next();
  }
}

//protect routh 
module.exports.protect = protect
//grant access to specific roles
module.exports.authorize = authorize