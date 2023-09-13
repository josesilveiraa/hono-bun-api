import mongoose from 'mongoose';

// @ts-ignore
await mongoose.connect(<string>Bun.env.MONGO_URI)
