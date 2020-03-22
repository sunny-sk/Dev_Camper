const Bootcamp = require("../models/Bootcamp");
const Course = require('../models/Course')
const Review = require('../models/Review')
const asyncHandler = require("../middleware/asyncHandler");


//@desc    Get all reviews
//@route   GET /api/v1/bootcamps/:id/reviews
//@route   GET /api/v1/reviews
//@access  Public
module.exports.getReview = asyncHandler(async (req, res, next) => {
  // const reviews = await Review.find({ bootcamp: req.params.id });
  // if (!reviews)
  //   return res.status(404).send({ success: false, code: 404, message: "not found" });
  // res
  //   .status(200)
  //   .send({ success: true, code: 200, count: reviews.length, data: reviews });

  res.send("Asdcvx ")

});