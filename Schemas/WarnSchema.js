const mongoose = require('mongoose')

const warnschema = new mongoose.Schema({
  username: mongoose.SchemaTypes.String,
  userId: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  warnId: mongoose.SchemaTypes.String,
  reason: mongoose.SchemaTypes.String,
  adminusername: mongoose.SchemaTypes.String,
  adminId: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  channel: mongoose.SchemaTypes.String,
  time: mongoose.SchemaTypes.String
})

module.exports = mongoose.model('warn', warnschema)
