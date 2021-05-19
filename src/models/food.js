'use strict';
const mongoose = require('mongoose');
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String },
});

const foodModel = mongoose.model('Food', foodSchema);

module.exports = foodModel;

// 'use strict';
// const mongoose = require('mongoose');

// const foodSchema = new mongoose.Schema({
//   type: { type: String, required: true },
//   price: { type: String },
// });

// const foodModel = mongoose.model('Food', foodSchema);

// module.exports = foodModel;