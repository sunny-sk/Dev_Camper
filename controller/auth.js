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
  res.status(200).send({ succuss: false, code: 201, message: 'user register', user: _.pick(user, ["_id", "email", "name", "token", "createdAt", "role"]) })

})


//@desc    Login User
//@route   GET /api/v1/auth/login
//@access  Public
module.exports.loginUser = asyncHandler(async (req, res, next) => {

  const { email, password } = req.body
  if (!email || !password)
    return next(new ErrorResponse('Please provide an email and password', 400))


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