const {Schema, model} = require('mongoose')

const userSchema = new Schema ({
  name: {
    type: String,
    require: true,
    min: 2
  },
  email: {
    type: String,
    require: true,
    min: 5,
    unique: true,
  },
  password: {
    type:  String,
    required: true,
    min: 2
  },
})

const User = model('User', userSchema)

module.exports = User