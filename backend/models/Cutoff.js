const mongoose = require('mongoose');
const CutoffSchema = new mongoose.Schema({
  programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' },
  exam: String,  // 'TS-EAMCET' | 'JEE'
  year: Number,
  round: Number,
  category: String, // GEN, OBC, SC, ST, EWS
  gender: String,   // M, F, Other
  openingRank: Number,
  closingRank: Number
});
module.exports = mongoose.model('Cutoff', CutoffSchema);
