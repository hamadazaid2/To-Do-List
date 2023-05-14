'use strict';

module.exports = {

  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
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
      expected_working_minutes: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM(['To Do', 'In Progress', 'QA', 'Done']),
        defaultValue: 'To Do'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      created_by: {
        allowNull: true,
        type: Sequelize.STRING
      },
      updated_by: {
        allowNull: true,
        type: Sequelize.STRING
      },
      deleted_by: {
        allowNull: true,
        type: Sequelize.STRING
      },
    });
  },



  down: async (queryInterface, Sequelize) => {
    // await queryInterface.dropTable('tasks');
  }
};