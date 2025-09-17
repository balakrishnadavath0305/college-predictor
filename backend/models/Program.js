const mongoose = require('mongoose');
const ProgramSchema = new mongoose.Schema({
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
  branch: String, // CSE, ECE, ME...
  fees: Number
});
module.exports = mongoose.model('Program', ProgramSchema);
