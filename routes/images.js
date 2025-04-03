const express = require("express");
const router = express.Router();
const { uploadImage, getImages } = require("../controllers/image");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

router.post("/upload", upload.single("profileImage"), uploadImage);
router.get("/images", getImages);

module.exports = router;