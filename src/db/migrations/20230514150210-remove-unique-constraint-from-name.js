'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('tasks', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false, // Remove the unique constraint
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('tasks', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, // Restore the unique constraint if needed
    });
  },
};
