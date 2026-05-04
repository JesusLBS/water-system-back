"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CatRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CatRole.init(
    {
      role: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: false,
      modelName: "CatRole",
      tableName: "CatRoles",
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
  return CatRole;
};
