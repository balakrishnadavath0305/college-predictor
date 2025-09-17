const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// minimal User schema inline for speed
const UserSchema = new mongoose.Schema({
  email:String, passwordHash:String, name:String, bookmarks:[String]
});
const User = mongoose.models.User || mongoose.model('User', UserSchema);

router.post('/register', async (req,res)=>{
  const { email, password, name } = req.body;
  if(!email || !password) return res.status(400).json({ error:'email+password required' });
  const hash = await bcrypt.hash(password, 10);
  const u = await User.create({ email, passwordHash: hash, name });
  res.json({ ok:true });
});

router.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(400).json({ error:'Invalid' });
  const match = await bcrypt.compare(password, user.passwordHash);
  if(!match) return res.status(400).json({ error:'Invalid' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
  res.json({ token });
});

module.exports = router;
