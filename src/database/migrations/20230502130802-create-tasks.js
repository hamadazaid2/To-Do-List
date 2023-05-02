'use strict';

module.exports = {

  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      priority: {
        type: Sequelize.INTEGER,
        defaultValue: 2,
        validate: {
          min: 1,
          max: 5
        }
      },
      expectedWorkingMinutes: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        validate: {
          isIn: ['To Do', 'In Progress', 'QA', 'Done'],
        },
        defaultValue: 'To Do'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },



  down: async (queryInterface, Sequelize) => {
    // await queryInterface.dropTable('tasks');
  }
};
