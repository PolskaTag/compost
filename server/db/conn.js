import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
const ATLAS_URI = process.env.ATLAS_URI;

let client;

try {
  // Connect the client to the server
  client = await mongoose.connect(ATLAS_URI);
} catch (err) {
  console.error(err);
}

let db = client;

export default db;
