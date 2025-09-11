// Simple test to create SQLite database and tables manually
const fs = require('fs');
const path = require('path');

// Create a simple SQLite database file
const dbPath = path.join(__dirname, 'dev.db');

try {
  // Create empty database file
  fs.writeFileSync(dbPath, '');
  console.log('✅ SQLite database file created at:', dbPath);
  
  // Check if file exists
  if (fs.existsSync(dbPath)) {
    console.log('✅ Database file exists and is accessible');
  }
} catch (error) {
  console.error('❌ Error creating database file:', error.message);
}