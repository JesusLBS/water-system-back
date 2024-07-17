"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WaterLine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WaterLine.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter a name",
          },
          len: {
            args: [1, 50],
            msg: "Name must be between 1 and 50 characters long",
          },
        },
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "WaterLine",
      tableName: "WaterLines",
      scopes: {
        raw: {
          raw: true,
          nest: true,
        },
        desc: {
          order: [["createdAt", "desc"]],
        },
      },
    },
  );
  return WaterLine;
};
