const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // You can add more fields as needed for your user model
});

//referencing book by user
userSchema.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'createdBy',
});

userSchema.set('toJSON', {
  virtuals: true,
});

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
