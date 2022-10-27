const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point']
  },
  coordinates: [Number]
})
