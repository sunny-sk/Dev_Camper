const Course = require("../models/Course");
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");

//@desc    Get all courses
//@route   GET /api/v1/courses
//@access  Public
module.exports.getAllCourses = asyncHandler(async (req, res, next) => {
  if (req.params.id) {
    const courses = await Course.find({ bootcamp: req.params.id });
    if (!courses)
      return res.send({ success: false, code: 404, message: "not found" });
    res
      .status(200)
      .send({ success: true, code: 200, count: courses.length, data: courses });
  } else {
    const courses = await Course.find().populate("bootcamp", {
      name: 1,
      description: 1
    });
    res
      .status(200)
      .send({ success: true, code: 200, count: courses.length, data: courses });
  }
});

//@desc    Get single courses
//@route   GET /api/v1/courses/:id
//@access  Public
module.exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course)
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );

  res.status(200).send({ success: true, code: 200, data: course });
});

//@desc     Create  courses
//@route    POST /api/v1/bootcamps/:id/courses
//@access   Private
module.exports.createCourse = asyncHandler(async (req, res, next) => {

  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) return res.status(404)
    .send({
      success: false, code: 404, message: "bootcamp doesn't exists with this id"
    });

  let course = new Course({
    title: req.body.title,
    description: req.body.description,
    website: req.body.website,
    weeks: req.body.weeks,
    tuition: req.body.tuition,
    minimumSkill: req.body.minimumSkill,
    scholarhipsAvailable: req.body.scholarhipsAvailable,
    bootcamp: req.params.id
    // ...req.body
  });
  course = await course.save();

  res
    .status(201)
    .send({ success: true, message: "created new course", data: course });
});

//@desc    update  courses
//@route   PUT /api/v1/courses/:id
//@access  Public
module.exports.updateCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!course)
    return res
      .status(404)
      .send({ success: false, code: 404, message: "not found" });

  res.status(200).send({ success: true, code: 200, data: course });
});


//@desc    delete  courses
//@route   DELETE /api/v1/courses/:id
//@access  Private
module.exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findByIdAndRemove(req.params.id);

  if (!course)
    return res
      .status(404)
      .send({ success: false, code: 404, message: "course not found" });

  res.status(200).send({
    success: true,
    code: 200,
    message: "course deleted successfully",
    data: course
  });
});
