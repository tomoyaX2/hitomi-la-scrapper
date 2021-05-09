"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Videos", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      title: {
        type: Sequelize.STRING,
      },
      path: {
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      album_id: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Videos");
  },
};
