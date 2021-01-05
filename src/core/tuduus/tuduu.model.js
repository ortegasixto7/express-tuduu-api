import mongoose from 'mongoose';

const Tuduu = mongoose.model('Tuduu', {
  name: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default Tuduu;
