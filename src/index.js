const database = require("./config/database");
const contactOps = require("./operations/contactOperations");

async function main() {
  try {
    // Connect to MongoDB
    await database.connect();

    console.log("🚀 Starting MongoDB CRUD Operations Demo");
    console.log("==========================================");

    // Insert initial data
    await contactOps.insertInitialContacts();

    // 1. Display all contacts
    await contactOps.displayAllContacts();

    // 2. Display contact by ID (get first contact's ID)
    const firstContactId = await contactOps.getFirstContactId();
    if (firstContactId) {
      await contactOps.displayContactById(firstContactId);
    }

    // 3. Display contacts with age > 18
    await contactOps.displayContactsOver18();

    // 4. Display contacts with age > 18 and name containing "ah"
    await contactOps.displayContactsOver18WithAh();

    // 5. Update Kefi Seif to Kefi Anis
    await contactOps.updateKefisName();

    // 6. Delete contacts under 5 years old
    await contactOps.deleteContactsUnder5();

    // 7. Display all contacts again (final result)
    console.log("\n📋 Final contact list after all operations:");
    await contactOps.displayAllContacts();

    console.log("\n✅ All operations completed successfully!");
  } catch (error) {
    console.error("❌ Application error:", error);
  } finally {
    // Disconnect from MongoDB
    await database.disconnect();
    process.exit(0);
  }
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Received SIGINT. Shutting down gracefully...");
  await database.disconnect();
  process.exit(0);
});

// Run the application
main();
