"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Projects", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
      },
      type_id: {
        type: Sequelize.UUID,
      },
      album_id: {
        type: Sequelize.UUID,
      },
      language_id: {
        type: Sequelize.UUID,
      },
      author_id: {
        type: Sequelize.UUID,
      },
      series_id: {
        type: Sequelize.UUID,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("projects");
  },
};
