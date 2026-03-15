'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WaterTake extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      WaterTake.belongsTo(models.Socio, {
        foreignKey: 'socioId',
      });
      WaterTake.belongsTo(models.WaterLine, {
        foreignKey: 'waterLineId',
      });
    }
  }
  WaterTake.init(
    {
      socioId: DataTypes.INTEGER,
      waterLineId: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'WaterTake',
      tableName: 'WaterTakes',
      scopes: {
        raw: {
          raw: true,
          nest: true,
        },
        desc: {
          order: [['createdAt', 'desc']],
        },
      },
    }
  );
  return WaterTake;
};
