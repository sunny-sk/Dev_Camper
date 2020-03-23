const Bootcamp = require("../models/Bootcamp");
const Course = require("../models/Course");
const Review = require("../models/Review");
const asyncHandler = require("../middleware/asyncHandler");

//@desc    Get all reviews
//@route   GET /api/v1/bootcamps/:id/reviews
//@route   GET /api/v1/reviews
//@access  Public
module.exports.getReview = asyncHandler(async (req, res, next) => {
  if (req.params.id) {
    const reviews = await Review.find({ bootcamp: req.params.id });
    if (!reviews)
      return res
        .status(404)
        .send({ success: false, code: 404, message: "not found" });
    res
      .status(200)
      .send({ success: true, count: reviews.length, code: 200, data: reviews });
  } else {
    const reviews = await Review.find();
    res
      .status(200)
      .send({ success: true, code: 200, count: reviews.length, data: reviews });
  }
});

//@desc    Get single reviews
//@route   GET /api/v1/reviews/:id
//@access  Public
module.exports.getSingleReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate("bootcamp", [
    "description",
    "name"
  ]);
  if (!review)
    return res.status(404).send({
      success: false,
      code: 404,
      message: `review not found with this ${req.params.id}`
    });
  res.status(200).send({ success: true, code: 200, data: review });
});

//@desc    add reviews
//@route   POST /api/v1/bootcampId/reviews
//@access  Private
module.exports.addReview = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return res.status(404).send({
      success: false,
      code: 404,
      message: `bootcamp not found with this ${req.params.id}`
    });
  }
  const review = new Review({
    title: req.body.title,
    text: req.body.text,
    bootcamp: req.params.id,
    user: req.user._id,
    rating: req.body.rating
  });
  await review.save();
  res.status(201).send({ success: true, code: 201, review });
});

//@desc    update reviews
//@route   PUT /api/v1/reviews/:id
//@access  Private
module.exports.updateReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return res.status(404).send({
      success: false,
      code: 404,
      message: `review not found with this ${req.params.id}`
    });
  }

  if (review.user.toString !== req.user._id && req.user.role !== "admin") {
    return res.status(401).send({
      success: false,
      code: 401,
      message: `not authorized to update this review ${req.params.id}`
    });
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(201).send({ success: true, code: 200, review });
});

//@desc    update reviews
//@route   PUT /api/v1/reviews/:id
//@access  Private
module.exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return res.status(404).send({
      success: false,
      code: 404,
      message: `review not found with this ${req.params.id}`
    });
  }

  if (review.user.toString !== req.user._id && req.user.role !== "admin") {
    return res.status(401).send({
      success: false,
      code: 401,
      message: `not authorized to delete this review ${req.params.id}`
    });
  }

  review = await Review.findByIdAndRemove(req.params.id);
  res.status(201).send({ success: true, code: 200, review });
});
