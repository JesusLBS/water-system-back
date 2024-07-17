"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Committee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Committee.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
          notNull: {
            msg: "Please enter the name of a committee",
          },
        },
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Committee",
      tableName: "Committees",
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
  return Committee;
};
