# MongoDB Contact CRUD Operations

This project demonstrates MongoDB CRUD operations using Node.js and MongoDB Atlas. It manages a contact database with various operations including create, read, update, and delete operations.

## Features

- ✅ Connect to MongoDB Atlas
- ✅ Create and manage contacts database
- ✅ Display all contacts
- ✅ Find contact by ID
- ✅ Filter contacts by age
- ✅ Search contacts with complex queries
- ✅ Update contact information
- ✅ Delete contacts based on criteria

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd mongodb-contact-crud
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/contact?retryWrites=true&w=majority
DB_NAME=contact
COLLECTION_NAME=contactlist
```

4. Replace `<username>`, `<password>`, and `<cluster-url>` with your MongoDB Atlas credentials.

## Usage

Run the application:

```bash
npm start
```

For development with auto-restart:

```bash
npm run dev
```

## Operations Performed

1. **Insert Initial Data**: Creates the contact database with sample contacts
2. **Display All Contacts**: Shows all contacts in the database
3. **Find by ID**: Displays contact information using ObjectId
4. **Filter by Age**: Shows contacts older than 18
5. **Complex Query**: Finds contacts over 18 with names containing "ah"
6. **Update Contact**: Changes "Kefi Seif" to "Kefi Anis"
7. **Delete Records**: Removes contacts under 5 years old
8. **Final Display**: Shows remaining contacts after all operations

## Project Structure

```
mongodb-contact-crud/
├── src/
│   ├── config/
│   │   └── database.js          # Database connection configuration
│   ├── operations/
│   │   └── contactOperations.js # CRUD operations implementation
│   └── index.js                 # Main application entry point
├── .env                         # Environment variables
├── .gitignore                   # Git ignore rules
├── package.json                 # Project dependencies
└── README.md                    # Project documentation
```

## Technologies Used

- Node.js
- MongoDB
- MongoDB Atlas
- dotenv for environment variables

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
