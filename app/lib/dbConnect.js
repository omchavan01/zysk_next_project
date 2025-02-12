import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("The MONGODB_URI environment variable must be defined");
}
let cached = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) {
    console.log("Using existing connection !!");
    return cached.conn;
  }
  if (!cached.promise) {
    console.log("Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  global.mongoose = cached;
  console.log("Connected to MongoDB !!");

  return cached.conn;
}

export default dbConnect;
