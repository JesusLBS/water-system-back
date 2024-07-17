"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CommitteeMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CommitteeMember.init(
    {
      committeeId: DataTypes.INTEGER,
      socioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: {
            msg: "Please enter a socio",
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
      paranoid: false,
      modelName: "CommitteeMember",
      tableName: "CommitteeMembers",
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
  return CommitteeMember;
};
