const express = require('express');
const router = express.Router();
const College = require('../models/College');
const Program = require('../models/Program');
const Cutoff = require('../models/Cutoff');

router.get('/', async (req,res) => {
  const { city, type } = req.query;
  const q = {};
  if(city) q.city = city;
  if(type) q.type = type;
  const colleges = await College.find(q).lean();
  res.json({ colleges });
});

router.get('/:id', async (req,res) => {
  const college = await College.findById(req.params.id).lean();
  if(!college) return res.status(404).json({ error: 'not found' });
  const programs = await Program.find({ collegeId: college._id }).lean();
  for(const p of programs){
    p.recentCutoffs = await Cutoff.find({ programId: p._id }).sort({ year: -1 }).limit(5).lean();
  }
  res.json({ college, programs });
});

module.exports = router;
