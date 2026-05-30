/**
 * Zamyaa Admin User Seeding Script
 * 
 * Run this script to create an initial admin user inside your MongoDB database:
 * node scripts/seed-admin.js
 */

const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const path = require("path");

// Load env variables manually from .env.local
require("dotenv").config({ path: path.join(__dirname, "../.env.local") });

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "Zamyaa";

if (!uri) {
  console.error("❌ Error: MONGODB_URI is missing from .env.local");
  process.exit(1);
}

// User credentials to seed
const adminEmail = "admin@zamyaa.com";
const adminPassword = "Zamya5080";
const adminName = "Zamyaa Admin";

async function main() {
  console.log("🔗 Connecting to MongoDB Atlas...");
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected successfully!");

    const db = client.db(dbName);
    const usersCollection = db.collection("users");

    console.log("🔑 Hashing password...");
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const newAdmin = {
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
    };

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email: adminEmail });

    if (existingUser) {
      console.log(`🔄 User already exists — updating password...`);
      await usersCollection.updateOne(
        { email: adminEmail },
        { $set: { password: hashedPassword, role: "admin" } }
      );
      console.log("=========================================");
      console.log("✅ Password Updated Successfully!");
      console.log(`   Admin Email: ${adminEmail}`);
      console.log(`   Admin Password: ${adminPassword}`);
      console.log("=========================================");
    } else {
      console.log("💾 Inserting admin user into database...");
      const result = await usersCollection.insertOne(newAdmin);
      console.log("=========================================");
      console.log("🎉 Seed Completed Successfully!");
      console.log(`   Admin Email: ${adminEmail}`);
      console.log(`   Admin Password: ${adminPassword}`);
      console.log(`   ID: ${result.insertedId}`);
      console.log("=========================================");
    }
    console.log("💡 You can now use these credentials to log in at /admin/login");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await client.close();
    console.log("🔌 Database connection closed.");
  }
}

main();
