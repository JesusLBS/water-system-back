"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  File.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter a name",
          },
        },
      },
      catFileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter a category file ID",
          },
          isInt: {
            msg: "Category file ID must be an integer",
          },
        },
      },
      url: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter a URL",
          },
          isUrl: {
            msg: "URL must be a valid URL",
          },
        },
      },
    },
    {
      sequelize,
      paranoid: false,
      modelName: "File",
      tableName: "Files",
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

  return File;
};
