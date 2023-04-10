'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class habresponse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.habresponse.belongsTo(models.user)
      models.habresponse.belongsTo(models.habit)
      models.habresponse.belongsTo(models.daily)
    }
  }
  habresponse.init({
    userId: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    habitId: DataTypes.INTEGER,
    response: DataTypes.BOOLEAN,
    dailyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'habresponse',
  });
  return habresponse;
};