const database = require("../config/database");

class ContactOperations {
  constructor() {
    this.collectionName = process.env.COLLECTION_NAME || "contactlist";
  }

  getCollection() {
    return database.getCollection(this.collectionName);
  }

  // Insert initial contacts
  async insertInitialContacts() {
    console.log("\n📝 Inserting initial contacts...");
    const contacts = [
      { lastName: "Ben", firstName: "Moris", email: "ben@gmail.com", age: 26 },
      { lastName: "Kefi", firstName: "Seif", email: "kefi@gmail.com", age: 15 },
      {
        lastName: "Emilie",
        firstName: "brouge",
        email: "emilie.b@gmail.com",
        age: 40,
      },
      { lastName: "Alex", firstName: "brown", age: 4 },
      { lastName: "Denzel", firstName: "Washington", age: 3 },
    ];

    try {
      const collection = this.getCollection();
      // Clear existing data first
      await collection.deleteMany({});
      const result = await collection.insertMany(contacts);
      console.log(`✅ Inserted ${result.insertedCount} contacts`);
      return result;
    } catch (error) {
      console.error("❌ Error inserting contacts:", error);
      throw error;
    }
  }

  // 1. Display all contacts
  async displayAllContacts() {
    console.log("\n📋 Displaying all contacts:");
    try {
      const collection = this.getCollection();
      const contacts = await collection.find({}).toArray();
      console.table(contacts);
      return contacts;
    } catch (error) {
      console.error("❌ Error displaying contacts:", error);
      throw error;
    }
  }

  // 2. Display contact by ID
  async displayContactById(id) {
    console.log(`\n🔍 Displaying contact with ID: ${id}`);
    try {
      const { ObjectId } = require("mongodb");
      const collection = this.getCollection();
      const contact = await collection.findOne({ _id: new ObjectId(id) });
      if (contact) {
        console.table([contact]);
      } else {
        console.log("❌ Contact not found");
      }
      return contact;
    } catch (error) {
      console.error("❌ Error finding contact by ID:", error);
      throw error;
    }
  }

  // 3. Display contacts with age > 18
  async displayContactsOver18() {
    console.log("\n👥 Displaying contacts with age > 18:");
    try {
      const collection = this.getCollection();
      const contacts = await collection.find({ age: { $gt: 18 } }).toArray();
      console.table(contacts);
      return contacts;
    } catch (error) {
      console.error("❌ Error displaying contacts over 18:", error);
      throw error;
    }
  }

  // 4. Display contacts with age > 18 and name containing "ah"
  async displayContactsOver18WithAh() {
    console.log(
      '\n🔍 Displaying contacts with age > 18 and name containing "ah":'
    );
    try {
      const collection = this.getCollection();
      const contacts = await collection
        .find({
          age: { $gt: 18 },
          $or: [
            { firstName: { $regex: "ah", $options: "i" } },
            { lastName: { $regex: "ah", $options: "i" } },
          ],
        })
        .toArray();
      console.table(contacts);
      return contacts;
    } catch (error) {
      console.error("❌ Error displaying contacts:", error);
      throw error;
    }
  }

  // 5. Update Kefi Seif to Kefi Anis
  async updateKefisName() {
    console.log("\n✏️ Updating Kefi Seif to Kefi Anis...");
    try {
      const collection = this.getCollection();
      const result = await collection.updateOne(
        { lastName: "Kefi", firstName: "Seif" },
        { $set: { firstName: "Anis" } }
      );
      console.log(`✅ Updated ${result.modifiedCount} document(s)`);
      return result;
    } catch (error) {
      console.error("❌ Error updating contact:", error);
      throw error;
    }
  }

  // 6. Delete contacts under 5 years old
  async deleteContactsUnder5() {
    console.log("\n🗑️ Deleting contacts under 5 years old...");
    try {
      const collection = this.getCollection();
      const result = await collection.deleteMany({ age: { $lt: 5 } });
      console.log(`✅ Deleted ${result.deletedCount} document(s)`);
      return result;
    } catch (error) {
      console.error("❌ Error deleting contacts:", error);
      throw error;
    }
  }

  // Get a contact ID for demonstration
  async getFirstContactId() {
    try {
      const collection = this.getCollection();
      const contact = await collection.findOne({});
      return contact ? contact._id.toString() : null;
    } catch (error) {
      console.error("❌ Error getting contact ID:", error);
      return null;
    }
  }
}

module.exports = new ContactOperations();
