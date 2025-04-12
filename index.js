const express = require('express');
const app = express();
const port = 2701;
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const path = require("path");
const staticRouter = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");
// const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  res.render("home", { allUrls, name: 'Vishal Surya' });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkForAuthentication);
// app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/url", restrictTo(['NORMAL', 'ADMIN']), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRouter);

app.use

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
