const express = require("express");

const path = require("path");

const multer = require("multer");

const app = express();

const port = 9292;  

const imagesRouter = require("./routes/images");

const Image = require("./models/image");

const { connectToMongoDb } = require("./connect");
// const upload = multer({ dest: "uploads/" });

connectToMongoDb("mongodb://localhost:27017/node-js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

connectToMongoDb("mongodb://localhost:27017/node-js");

const upload = multer({ storage: storage })

app.set("view engine", "ejs");

app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.use("/images", imagesRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


