'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dailies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATEONLY
      },
      rating: {
        type: Sequelize.INTEGER
      },
      mood_AM: {
        type: Sequelize.STRING
      },
      mood_PM: {
        type: Sequelize.STRING
      },
      stress: {
        type: Sequelize.INTEGER
      },
      activity: {
        type: Sequelize.INTEGER
      },
      diet: {
        type: Sequelize.STRING
      },
      woke_up: {
        type: Sequelize.TIME
      },
      bed: {
        type: Sequelize.TIME
      },
      water: {
        type: Sequelize.INTEGER
      },
      weather_conditions: {
        type: Sequelize.STRING
      },
      weather_high: {
        type: Sequelize.INTEGER
      },
      weather_low: {
        type: Sequelize.INTEGER
      },
      affirmations: {
        type: Sequelize.TEXT
      },
      notes: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('dailies');
  }
};