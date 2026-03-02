const { Sequelize } = require('sequelize');

// Replace these with your actual MySQL details
const sequelize = new Sequelize('tsk', 'root', 'pass123', {
  host: '127.0.0.1', // or 'localhost'
  dialect: 'mysql',
  logging: false,    // Set to true if you want to see the SQL commands in the terminal
});

// The Test Function
async function testConnection() {
  try {
    // This is the actual test
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:');
    
    // Troubleshooting specific errors
    if (error.name === 'SequelizeAccessDeniedError') {
      console.error('Check your username or password!');
    } else if (error.name === 'SequelizeConnectionRefusedError') {
      console.error('Is your MySQL server actually running?');
    } else {
      console.error(error.message);
    }
  }
}

// Run the test immediately
testConnection();

module.exports = sequelize;