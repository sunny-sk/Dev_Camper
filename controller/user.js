const User = require('../models/User');
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const bcrypt = require("bcrypt");


//@desc    get all User
//@route   GET /api/v1/auth/users
//@access  Private/Admin
module.exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find()
  res.status(200).send({ succuss: true, code: 200, count: users.length, users })
})

//@desc    get single User
//@route   GET /api/v1/auth/users/:id
//@access  Private/Admin
module.exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return res.status(404).send({ succuss: false, code: 404, message: `use not found with this id ${req.params.id}` })
  }
  res.status(200).send({ succuss: true, code: 200, user })
})

//@desc    Create User
//@route   POST /api/v1/auth/users/
//@access  Private/Admin
module.exports.createUser = asyncHandler(async (req, res, next) => {


  const { name, password, email, role } = req.body



  user = await User.findOne({ email: req.body.email })

  if (user)
    return res.status(400).send({
      success: false,
      code: 400,
      message: `user already exists with this email already ${req.body.email}`
    });

  user = new User({
    name, email, password, role
  })
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt)
  user = await user.save()
  res.status(201).send({ succuss: true, code: 201, message: 'user register' })
})


//@desc    Update User
//@route   PUT /api/v1/auth/users/:id
//@access  Private/Admin
module.exports.updateUser = asyncHandler(async (req, res, next) => {

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user)
    return res.status(404).send({
      success: false,
      code: 404,
      message: `user not found with this id ${req.params.id}`
    });

  res.status(200).send({ success: true, code: 200, data: user });


})

//@desc    Delete User
//@route   DELEtE /api/v1/auth/users/:id
//@access  Private/Admin
module.exports.deleteUser = asyncHandler(async (req, res, next) => {

  let user = await User.findById(req.params.id)
  if (!user)
    return res.status(404).send({
      success: false,
      code: 404,
      message: `user not found with this id ${req.params.id}`
    });

  user = await User.findByIdAndRemove(req.params.id)

  res.status(200).send({
    success: true,
    code: 200,
    message: "user deleted successfully",
    data: user
  });
})