"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FileOfUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FileOfUser.init(
    {
      fileId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: false,
      modelName: "FileOfUser",
      tableName: "FileOfUsers",
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
  return FileOfUser;
};
