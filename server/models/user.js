const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    min: [4, 'too short min is 4 '],
    max: [32, 'Too long max is 32']
  },

  email: {
    type: String,
    min: [4, 'too short min is 4 '],
    max: [32, 'Too long max is 32'],
    required: 'Email is required',
    lowercase: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    min: [4, 'too short min is 4 '],
    max: [32, 'Too long max is 32'],
    required: 'Password is required'
  },
  rentals: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Rental'
    }
  ]
});
userSchema.methods.checkingPasswords = function(requestedPassword) {
  return bcrypt.compareSync(requestedPassword, this.password);
};
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', userSchema);
