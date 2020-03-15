const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const geocoder = require("../utils/geoCoder");

//@desc    Get all bootcamps
//@route   GET /api/v1/bootcamps
//@access  Public
module.exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find().populate("courses");
  res
    .status(200)
    .send({ success: true, code: 200, count: bootcamps.length, bootcamps });
});

//@desc    Get single bootcamp
//@route   GET /api/v1/bootcamps/:id
//@access  Public
module.exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).send({ success: true, code: 200, bootcamp });
});
//@desc    Get  bootcamp within a radius
//@route   GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access  Public
module.exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const long = loc[0].longitude;
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: {
        $centerSphere: [[long, lat], radius]
      }
    }
  });

  res
    .status(200)
    .send({ success: true, count: bootcamps.length, code: 200, bootcamps });
});

//@desc     Create  bootcamp
//@route    POST /api/v1/bootcamps
//@access   Private
module.exports.createBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = new Bootcamp({
    name: req.body.name,
    description: req.body.description,
    website: req.body.website,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    careers: req.body.careers,
    housing: req.body.housing,
    jobAssistance: req.body.jobAssistance,
    acceptGi: req.body.acceptGi
  });
  bootcamp = await bootcamp.save();

  res
    .status(201)
    .send({ success: true, message: "created new bootcamp", data: bootcamp });
});

//@desc    update  bootcamps
//@route   PUT /api/v1/bootcamps/:id
//@access  Public
module.exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!bootcamp)
    return res
      .status(404)
      .send({ success: false, code: 404, message: "not found" });

  res.status(200).send({ success: true, code: 200, data: bootcamp });
});

//@desc    delete  bootcamps
//@route   DELETE /api/v1/bootcamps/:id
//@access  Private
module.exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
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
});
