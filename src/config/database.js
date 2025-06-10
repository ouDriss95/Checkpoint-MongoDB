const { MongoClient } = require("mongodb");
require("dotenv").config();

class Database {
  constructor() {
    this.client = null;
    this.db = null;
  }

  async connect() {
    try {
      console.log("Connecting to MongoDB Atlas...");
      this.client = new MongoClient(process.env.MONGODB_URI);
      await this.client.connect();
      this.db = this.client.db(process.env.DB_NAME);
      console.log("✅ Successfully connected to MongoDB Atlas");
      return this.db;
    } catch (error) {
      console.error("❌ MongoDB connection error:", error);
      throw error;
    }
  }

  async disconnect() {
    try {
      if (this.client) {
        await this.client.close();
        console.log("✅ Disconnected from MongoDB Atlas");
      }
    } catch (error) {
      console.error("❌ Error disconnecting from MongoDB:", error);
    }
  }

  getDb() {
    return this.db;
  }

  getCollection(collectionName) {
    return this.db.collection(collectionName);
  }
}

module.exports = new Database();
