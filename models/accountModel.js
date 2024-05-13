const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./userModel'); // Import the User model if it's defined in a separate file

const AccountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  accountIdentifier: { type: String, required: true },
  accountType: { type: String, default: 'free', enum: ['free', 'premium'] },
  password: { type: String, required: true},
  registrationDate: { type: Date, default: Date.now },
  terminationDate: { type: Date, required: false },
  status: { type: String, default: 'active', enum: ['active', 'inactive', 'pending'] },
  accountSettings: {
    notifications: { type: Boolean, default: true },
    privacy: { type: String, default: 'public' },
  },
});

// Hash password before saving
AccountSchema.pre('save', async function(next) {
  const account = this;
  if (!account.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(account.password, salt);
    account.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
AccountSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
