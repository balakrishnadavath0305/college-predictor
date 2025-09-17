// backend/scripts/seedSample.js
require('dotenv').config();
const mongoose = require('mongoose');
const College = require('../models/College');
const Program = require('../models/Program');
const Cutoff = require('../models/Cutoff');

async function run(){
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/college_predictor');
  await College.deleteMany({});
  await Program.deleteMany({});
  await Cutoff.deleteMany({});

  const c1 = await College.create({ name:'Hyderabad Tech Institute', type:'government', city:'Hyderabad', reputationIndex:0.8, feeRange:{min:20000,max:60000} });
  const p1 = await Program.create({ collegeId: c1._id, branch:'CSE', fees:40000 });
  const p2 = await Program.create({ collegeId: c1._id, branch:'ECE', fees:30000 });

  await Cutoff.create([
    { programId: p1._id, exam:'TS-EAMCET', year:2022, round:3, category:'GEN', gender:'M', closingRank:1500 },
    { programId: p1._id, exam:'TS-EAMCET', year:2023, round:3, category:'GEN', gender:'M', closingRank:1600 },
    { programId: p1._id, exam:'TS-EAMCET', year:2024, round:3, category:'GEN', gender:'M', closingRank:1550 },

    { programId: p2._id, exam:'TS-EAMCET', year:2022, round:3, category:'GEN', gender:'M', closingRank:3000 },
    { programId: p2._id, exam:'TS-EAMCET', year:2023, round:3, category:'GEN', gender:'M', closingRank:2800 },
    { programId: p2._id, exam:'TS-EAMCET', year:2024, round:3, category:'GEN', gender:'M', closingRank:2900 }
  ]);

  console.log('Seed completed');
  process.exit(0);
}

run();
