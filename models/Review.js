const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add title for review"],
    trim: true,
    maxlength: 100
  },
  text: {
    type: String,
    trim: true,
    required: [true, "Please add some text"]
  },
  rating: {
    type: Number,
    required: [true, "Please add a number of weeks"],
    min: 1,
    max: 10,
    required: [true, "Please add a rating between 1 to 10"]
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  }
});

//one user one review per bootcamp
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
