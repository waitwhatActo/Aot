const mongoose = require('mongoose')

const muteschema = new mongoose.Schema({
  username: mongoose.SchemaTypes.String,
  userId: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  duration: mongoose.SchemaTypes.String,
  reason: mongoose.SchemaTypes.String,
  adminusername: mongoose.SchemaTypes.String,
  adminId: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  permanent: {
    type: mongoose.SchemaTypes.Boolean,
    required: true
  },
  time: mongoose.SchemaTypes.String,
  unmutetime: mongoose.SchemaTypes.String
})

module.exports = mongoose.model('mute', muteschema)
