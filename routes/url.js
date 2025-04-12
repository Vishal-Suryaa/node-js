const express = require("express");
const { handleCreateShortUrl, handleGetAnalytics, handleRedirectToOriginalUrl, handleDeleteShortUrl } = require("../controllers/url");
const router = express.Router();

router.post("/", handleCreateShortUrl);

router.get("/:shortId", handleRedirectToOriginalUrl);

router.get("/analytics/:shortId", handleGetAnalytics);

router.delete("/:shortId", handleDeleteShortUrl);

module.exports = router;
