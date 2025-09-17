const express = require("express");
const router = express.Router();
const College = require("../models/College");

// POST /api/predict
router.post("/", async (req, res) => {
  try {
    const { exam, rank, category, gender, branch } = req.body;

    // Find colleges where cutoffRank >= given rank
    const colleges = await College.find({
      exam: exam,
      branch: branch,
      category: category,
      gender: gender,
      cutoffRank: { $gte: rank } // rank must be less or equal to cutoff
    }).sort({ cutoffRank: 1 });

    res.json({ results: colleges });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
