'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class daily extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  daily.init({
    userId: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    rating: DataTypes.INTEGER,
    mood_AM: DataTypes.STRING,
    mood_PM: DataTypes.STRING,
    stress: DataTypes.STRING,
    activity: DataTypes.STRING,
    diet: DataTypes.STRING,
    woke_up: DataTypes.TIME,
    bed: DataTypes.TIME,
    water: DataTypes.INTEGER,
    weather_conditions: DataTypes.STRING,
    weather_high: DataTypes.INTEGER,
    weather_low: DataTypes.INTEGER,
    affirmations: DataTypes.TEXT,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'daily',
  });
  return daily;
};