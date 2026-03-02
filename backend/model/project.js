const { DataTypes } = require('sequelize');
const sequelize = require('../connection'); // Import the connection we just tested

const Project = sequelize.define('Project', {
  // Column 1: ID is handled automatically by Sequelize (Auto-increment)
  
  // Column 2: Name of the project
  name: {
    type: DataTypes.STRING,
    allowNull: false, // This makes it NOT NULL in MySQL
    validate: {
      notEmpty: true, // Prevents saving empty strings ""
    }
  },

  // Column 3: Description
  description: {
    type: DataTypes.TEXT, // TEXT allows for longer strings than STRING (VARCHAR)
    allowNull: true
  },

  // Column 4: Status
  status: {
    type: DataTypes.ENUM('active', 'archived', 'completed'),
    defaultValue: 'active'
  }
}, {
  // Options
  timestamps: true, // Automatically adds createdAt and updatedAt columns
});

const Task = sequelize.define('Task', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
        defaultValue: 'pending'
    }
}, {
    timestamps: true,
});

Project.hasMany(Task, { foreignKey: 'projectId' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

module.exports = { Project, Task };