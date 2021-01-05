import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  securityCode: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

export default User;
