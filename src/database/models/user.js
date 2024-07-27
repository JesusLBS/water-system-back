"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: {
            msg: "Please enter your user uid",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
          notNull: {
            msg: "Please enter your email",
          },
        },
      },
      catRoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: {
            msg: "Please enter a role",
          },
        },
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "User",
      tableName: "Users",
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
  return User;
};
