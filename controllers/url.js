const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleCreateShortUrl(req, res) {
  const shortId = nanoid(8);
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }

  const existingUrl = await URL.findOne({ redirectURL: body.url });
  if (existingUrl) {
    return res.status(201).json({ error: "url already exists" });
  }

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  // Fetch all URLs from the database
  const allUrls = await URL.find({});
  console.log('showAllUrls', allUrls);

  // Render the home.ejs template and pass allUrls
  return res.render("home", { allUrls });
}

async function handleRedirectToOriginalUrl(req, res) {
  const shortId = req.params.shortId;
  try {
    const url = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.redirect(url.redirectURL);
  } catch (error) {
    console.error("Error redirecting:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const url = await URL.findOne({ shortId });
  return res.json({
    totalClicks: url.visitHistory.length,
    analytics: url.visitHistory,
  });
}

async function handleDeleteShortUrl(req, res) {
  const shortId = req.params.shortId;
  await URL.deleteOne({ shortId });
  return res.json({ message: "Short URL deleted successfully" });
}

module.exports = {
  handleCreateShortUrl,
  handleRedirectToOriginalUrl,
  handleGetAnalytics,
  handleDeleteShortUrl,
};
