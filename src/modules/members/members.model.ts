import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ]
});

export type Member = mongoose.InferSchemaType<typeof memberSchema>;
export const Member = mongoose.model('Member', memberSchema);
