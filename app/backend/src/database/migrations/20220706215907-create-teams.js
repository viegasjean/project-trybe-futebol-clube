'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      team_name: {
        type: Sequelize.STRING
      }
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('teams');

  }
};
