import mongoose from 'mongoose';

await mongoose.connect(Bun.env.MONGO_URI);
