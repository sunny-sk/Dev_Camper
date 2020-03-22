const User = require('../models/User');
const _ = require("lodash");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const bcrypt = require("bcrypt");


//@desc    Register User
//@route   GET /api/v1/auth/register
//@access  Public
module.exports.registerUser = asyncHandler(async (req, res, next) => {
  let user;
  user = await User.findOne({ email: req.body.email })
  if (user)
    return res.status(400).send({
      success: false,
      code: 400,
      message: "email already registered"
    });

  const { name, password, email, role } = req.body

  user = new User({
    name, email, password, role
  })

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt)

  const token = user.generateAuthToken()
  user.token = token
  user = await user.save()
  res.status(201).send({ succuss: true, code: 201, message: 'user register', user: _.pick(user, ["_id", "email", "name", "token", "createdAt", "role"]) })

})


//@desc    Login User
//@route   GET /api/v1/auth/login
//@access  Public
module.exports.loginUser = asyncHandler(async (req, res, next) => {
  console.log('in login')
  const { email, password } = req.body
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400))
  }
  let user = await User.findOne({ email: req.body.email })
  if (!user)
    return res.status(400).send({
      success: false,
      code: 400,
      message: "user not found with this email"
    });


  const validPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!validPassword)
    return res
      .status(400)
      .send({ success: false, message: "Invalid email or password" });


  const token = user.generateAuthToken()
  user.token = token
  await user.save()
  res.status(200).send({ succuss: false, code: 201, message: 'user loggedin', user: user })

})


//@desc    Current User
//@route   GET /api/v1/auth/me
//@access  Private
module.exports.currentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send({ success: true, code: 200, user });
})
//@desc    forgot Password
//@route   POST /api/v1/auth/forgotpassword
//@access  Public
module.exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    res.status(404).send({ succuss: false, code: 404, message: `there is no user with this ${req.body.email}` })
  }

  const token = User.generateAuthToken()
  console.log(token)
  res.send({ success: true, code: 200, user });
})
//@desc    change password
//@route   POST /api/v1/auth/changePassword
//@access  Public
module.exports.resetPassword = asyncHandler(async (req, res, next) => {
  if (!req.body.oldPassword || !req.body.newPassword) {
    return res.status(400).send({ success: false, code: 400, message: ' please add oldPassword field and newPassword field' })
  } else if (req.body.oldPassword.length < 5 || req.body.newPassword.length < 5) {
    return res.status(400).send({ success: false, code: 400, message: 'oldPassword ,newPassword length of atleast 6 characters ' })
  }
  console.log(req.user._id)
  let user = await User.findById(req.user._id);
  if (!user)
    return res
      .status(400)
      .send({ success: false, code: 400, message: "invalid user Id" });

  const validPassword = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );
  if (!validPassword)
    return res
      .status(400)
      .send({ success: false, code: 400, message: "incorrect old password" });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.newPassword, salt);
  await user.save();
  res.status(200).send({
    success: true,
    code: 200,
    message: "password updated successfully"
  });
})
