// import { MongoClient, Db, MongoClientOptions } from "mongodb";

// // ✅ Ensure this runs only on the server
// if (typeof window !== "undefined") {
//   throw new Error("❌ MongoDB should only be used on the server!");
// }

// // ✅ Ensure MongoDB URI is defined
// const uri: string = process.env.MONGODB_URI || "";
// if (!uri) {
//   throw new Error("❌ Please add your MONGODB_URI to .env.local");
// }

// // ✅ Correct MongoDB connection options
// const options: MongoClientOptions = {
//   tls: true,
//   serverSelectionTimeoutMS: 10000,
//   socketTimeoutMS: 45000,
//   retryWrites: true,
//   w: "majority",
// };

// // 👇 Use global variable to prevent reconnection issues in dev mode
// declare global {
//   var _mongoClientPromise: Promise<MongoClient> | undefined;
// }

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (!global._mongoClientPromise) {
//   console.log("⚡ Connecting to MongoDB...");
//   client = new MongoClient(uri, options);
//   global._mongoClientPromise = client.connect();
// }

// clientPromise = global._mongoClientPromise;

// /**
//  * ✅ Connects to MongoDB and returns the database instance.
//  */
// export async function connectToDatabase(): Promise<Db> {
//   try {
//     const client = await clientPromise;
//     console.log("✅ MongoDB Connected Successfully!");
//     return client.db("User-management-system");
//   } catch (error) {
//     console.error("❌ MongoDB Connection Failed:", error);
//     throw new Error("MongoDB connection error");
//   }
// }

// export default clientPromise;


import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

// ✅ Ensure MongoDB URI exists
if (!MONGODB_URI) {
  throw new Error("❌ Please add MONGODB_URI to .env.local");
}

const options = {
  bufferCommands: false, // ✅ Prevents Mongoose from buffering queries
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 15000, // ✅ Increase timeout to 15s
  socketTimeoutMS: 45000, // ✅ Ensure longer socket connection
};

let cached = (global as any)._mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("⚡ Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB Connected Successfully!");
    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    throw new Error("MongoDB connection error");
  }
}
