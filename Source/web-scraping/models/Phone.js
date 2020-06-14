const mongoose = require('mongoose');
const { Schema } = mongoose;
const ReviewSchema = require('./Review')

const phoneSchema = new Schema({
  image: String,
  name: String,
  price: String,
  url: String,
  reviews: [ReviewSchema],
})

mongoose.model('phones', phoneSchema);