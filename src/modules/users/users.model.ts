import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
    }
  ]
});

userSchema.pre('save', async function(next) {
  this.password = await Bun.password.hash(this.password, 'bcrypt');

  next();
});

export type User = mongoose.InferSchemaType<typeof userSchema>;
export const User = mongoose.model('User', userSchema);
