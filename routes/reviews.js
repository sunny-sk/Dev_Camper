const express = require("express");
const router = express.Router({ mergeParams: true });

const { getReview } = require('../controller/reviews')
const { protect, authorize } = require('../middleware/auth')

//@desc comes from /bootcamps/:id/reviews
//@desc comes from /reviews
router.get("/", getReview);


module.exports = router;
