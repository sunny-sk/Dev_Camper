const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getReview,
  getSingleReview,
  addReview,
  deleteReview,
  updateReview
} = require("../controller/reviews");
const { protect, authorize } = require("../middleware/auth");

//@desc comes from /bootcamps/:id/reviews
router.get("/", getReview);
router.post("/", protect, authorize("user", "admin"), addReview);

//@desc comes from /reviews
router.get("/:id", getSingleReview);
router.put("/:id", protect, authorize("user", "admin"), updateReview);
router.delete("/:id", authorize("user", "admin"), deleteReview);

module.exports = router;
