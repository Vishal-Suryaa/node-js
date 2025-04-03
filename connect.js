const mongoose = require("mongoose");

async function connectToMongoDb(url) {
  await mongoose.connect(url)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { connectToMongoDb };
