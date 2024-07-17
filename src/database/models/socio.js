"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Socio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Socio.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: {
            msg: "Please enter a user ID",
          },
          isInt: {
            msg: "User ID must be an integer",
          },
        },
      },
      totalDependents: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Socio",
      tableName: "Socios",
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
  return Socio;
};
