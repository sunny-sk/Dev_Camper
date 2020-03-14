const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
//@desc    Get all bootcamps
//@route   GET /api/v1/bootcamps
//@access  Public
module.exports.getAllBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .send({ success: true, code: 200, count: bootcamps.length, bootcamps });
  } catch (error) {
    console.log(error);
  }
};

//@desc    Get single bootcamp
//@route   GET /api/v1/bootcamps/:id
//@access  Public
module.exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp)
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );

    res.status(200).send({ success: true, code: 200, bootcamp });
  } catch (error) {
    // res.send(error);
    // // next(
    // //   new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    // // );
    next(error);
  }
};

//@desc     Create  bootcamp
//@route    POST /api/v1/bootcamps
//@access   Private
module.exports.createBootcamp = async (req, res, next) => {
  try {
    console.log(req.body);
    let bootcamp = new Bootcamp({ ...req.body });
    bootcamp = await bootcamp.save();

    res
      .status(201)
      .send({ success: true, message: "created new bootcamp", data: bootcamp });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

//@desc    update  bootcamps
//@route   PUT /api/v1/bootcamps/:id
//@access  Public
module.exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!bootcamp)
      return res
        .status(404)
        .send({ success: false, code: 404, message: "not found" });

    res.status(200).send({ success: true, code: 200, data: bootcamp });
  } catch (error) {}
};
//@desc    delete  bootcamps
//@route   DELETE /api/v1/bootcamps/:id
//@access  Private
module.exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndRemove(req.params.id);
    if (!bootcamp)
      return res
        .status(404)
        .send({ success: false, code: 404, message: "not found" });
    res.status(200).send({
      success: true,
      code: 200,
      message: "deleted successfully",
      data: bootcamp
    });
  } catch (error) {}
};
