const Image = require("../models/image");

async function uploadImage(req, res) {
  console.log('req.body', req.body);
  console.log('req.file', req.file);
  const image = {
    name: req.body.name,
    image: req.file.path,
  };
  await Image.create(image);
  const images = await Image.find();
  return res.render("images", { images });
}

async function getImages(req, res) {
  const images = await Image.find();
  console.log('images', images);
  return res.render("images", { images });
}

module.exports = { uploadImage, getImages };
