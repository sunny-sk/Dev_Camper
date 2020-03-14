const express = require("express");
const router = express.Router();
const Bootcamp = require("../models/Bootcamp");

const {
  getAllBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp
} = require("../controller/bootcamps");

// router.get("/", async (req, res, next) => {
//   try {
//     const bootcamps = await Bootcamp.find();
//     res.send(bootcamps);
//   } catch (error) {}
// });
router.get("/", getAllBootcamps);

router.get("/:id", getBootcamp);
router.post("/", createBootcamp);
router.put("/:id", updateBootcamp);
router.delete("/:id", deleteBootcamp);

module.exports = router;
