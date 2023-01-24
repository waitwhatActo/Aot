const mongoose = require('mongoose')

const countschema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  numbercounted: {
    type: mongoose.SchemaTypes.String,
    required: true
  }
})

module.exports = mongoose.model('count', countschema)
