import { MongoClient, Db } from "mongodb";

const uri: string = process.env.MONGODB_URI as string;
if (!uri) {
  throw new Error("❌ Please add your MONGODB_URI to .env.local");
}

// ✅ Correct MongoDB connection options (without deprecated ones)
const options = {
  tls: true, // Ensures secure TLS connection
  tlsAllowInvalidCertificates: false, // Rejects invalid certificates
  serverSelectionTimeoutMS: 5000, // Lower timeout to detect connection issues quickly
  socketTimeoutMS: 45000, // Keep socket open for 45s before closing inactive connections
};

// ✅ Global caching for a single MongoDB connection
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    console.log("⚡ Creating a new MongoDB connection in development mode...");
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  console.log("🚀 Connecting to MongoDB in production mode...");
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

/**
 * ✅ Connects to MongoDB and returns the database instance.
 * @returns {Promise<Db>} The database instance
 */
export async function connectToDatabase(): Promise<Db> {
  try {
    const client = await clientPromise;
    console.log("✅ MongoDB Connected Successfully!");
    return client.db();
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    throw new Error("MongoDB connection error");
  }
}
