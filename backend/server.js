const express = require("express");
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRouter');
const sequelize = require('./connection');

const app = express();

// 1. Middleware first
app.use(express.json());

// 2. Routes second
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// 3. Database Sync & Server Start (Single function)
async function startApp() {
  try {
    // Authenticate checks the password, sync checks the tables
    await sequelize.authenticate();
    console.log('✅ MySQL Connected!');
    
    await sequelize.sync(); 
    console.log('✅ Database Synced!');

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to start the app:', error);
  }
}

startApp();