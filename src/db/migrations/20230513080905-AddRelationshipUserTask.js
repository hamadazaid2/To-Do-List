'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the foreign key column to the Task table
    await queryInterface.addColumn('tasks', 'user_id', {
      type: Sequelize.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the foreign key column from the Task table
    // await queryInterface.removeColumn('Task', 'user_id');
  },
};