"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CatMaritalStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CatMaritalStatus.init(
    {
      name: DataTypes.STRING,
      descriptiom: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: false,
      modelName: "CatMaritalStatus",
      tableName: "CatMaritalStatuses",
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
  return CatMaritalStatus;
};
