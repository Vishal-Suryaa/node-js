const express = require("express");
const path = require("path");
const app = express();
const port = 4000;
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
app.set("view engine", "ejs");

app.set("views", path.resolve("./views"));

// Add body parsing middleware BEFORE routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home");
}); 

mongoose.connect("mongodb://localhost:27017/blogify").then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log("Error connecting to MongoDB", err);
});

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
