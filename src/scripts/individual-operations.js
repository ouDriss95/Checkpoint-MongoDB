const database = require("../config/database");
const contactOps = require("../operations/contactOperations");

// Get operation from command line argument
const operation = process.argv[2];

async function runOperation(op) {
  try {
    await database.connect();

    switch (op) {
      case "init":
        console.log("🔄 INITIALIZING DATABASE");
        console.log("=".repeat(40));
        await contactOps.insertInitialContacts();
        break;

      case "all":
        console.log("📋 DISPLAY ALL CONTACTS");
        console.log("=".repeat(40));
        await contactOps.displayAllContacts();
        break;

      case "byid":
        console.log("🔍 DISPLAY CONTACT BY ID");
        console.log("=".repeat(40));
        const contactId = await contactOps.getFirstContactId();
        if (contactId) {
          console.log(`Using contact ID: ${contactId}`);
          await contactOps.displayContactById(contactId);
        } else {
          console.log("❌ No contacts found");
        }
        break;

      case "over18":
        console.log("👥 DISPLAY CONTACTS OVER 18");
        console.log("=".repeat(40));
        await contactOps.displayContactsOver18();
        break;

      case "over18ah":
        console.log('🔍 DISPLAY CONTACTS OVER 18 WITH "AH"');
        console.log("=".repeat(40));
        await contactOps.displayContactsOver18WithAh();
        break;

      case "update":
        console.log("✏️ UPDATE KEFI SEIF TO KEFI ANIS");
        console.log("=".repeat(40));
        console.log("Before update:");
        await contactOps.displayAllContacts();
        console.log("\nUpdating...");
        await contactOps.updateKefisName();
        console.log("\nAfter update:");
        await contactOps.displayAllContacts();
        break;

      case "delete":
        console.log("🗑️ DELETE CONTACTS UNDER 5");
        console.log("=".repeat(40));
        console.log("Before deletion:");
        await contactOps.displayAllContacts();
        console.log("\nDeleting...");
        await contactOps.deleteContactsUnder5();
        console.log("\nAfter deletion:");
        await contactOps.displayAllContacts();
        break;

      case "sequence":
        console.log("🚀 RUNNING ALL OPERATIONS IN SEQUENCE");
        console.log("=".repeat(50));

        console.log("\n📝 Step 1: Initialize Database");
        await contactOps.insertInitialContacts();

        console.log("\n📋 Step 2: Display All Contacts");
        await contactOps.displayAllContacts();

        console.log("\n🔍 Step 3: Display Contact by ID");
        const id = await contactOps.getFirstContactId();
        if (id) await contactOps.displayContactById(id);

        console.log("\n👥 Step 4: Display Contacts Over 18");
        await contactOps.displayContactsOver18();

        console.log('\n🔍 Step 5: Display Contacts Over 18 with "ah"');
        await contactOps.displayContactsOver18WithAh();

        console.log("\n✏️ Step 6: Update Kefi Seif to Kefi Anis");
        await contactOps.updateKefisName();

        console.log("\n🗑️ Step 7: Delete Contacts Under 5");
        await contactOps.deleteContactsUnder5();

        console.log("\n📋 Step 8: Final Contact List");
        await contactOps.displayAllContacts();
        break;

      default:
        console.log("❌ Invalid operation. Available operations:");
        console.log("  init     - Initialize database with sample contacts");
        console.log("  all      - Display all contacts");
        console.log("  byid     - Display contact by ID");
        console.log("  over18   - Display contacts over 18");
        console.log('  over18ah - Display contacts over 18 with "ah"');
        console.log("  update   - Update Kefi Seif to Kefi Anis");
        console.log("  delete   - Delete contacts under 5");
        console.log("  sequence - Run all operations in sequence");
        console.log(
          "\nUsage: node src/scripts/individual-operations.js <operation>"
        );
    }
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await database.disconnect();
    process.exit(0);
  }
}

if (!operation) {
  console.log("❌ Please specify an operation");
  console.log("Usage: node src/scripts/individual-operations.js <operation>");
  process.exit(1);
}

runOperation(operation);
