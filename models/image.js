const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
  },
  { timestamps: true }
);

const Image = mongoose.model("image", imageSchema);

module.exports = Image;
