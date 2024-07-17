"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Dependent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Dependent.init(
    {
      socioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: {
            msg: "Please enter a socio ID",
          },
          isInt: {
            msg: "Socio ID must be an integer",
          },
        },
      },
      isFamilyHead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: {
            msg: "Please specify if the person is the family head",
          },
        },
        defaultValue: 0,
      },
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
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter a last name",
          },
          len: {
            args: [1, 50],
            msg: "Last name must be between 1 and 50 characters long",
          },
        },
      },
      secondLastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter a last name",
          },
          len: {
            args: [1, 50],
            msg: "Last name must be between 1 and 50 characters long",
          },
        },
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter a mobile number",
          },
          len: {
            args: [10, 15],
            msg: "Mobile number must be between 10 and 15 characters long",
          },
        },
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter a birthdate",
          },
          isDate: {
            msg: "Birthdate must be a valid date",
          },
        },
      },
      catRelationshipId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: {
            msg: "Please enter a relationship ID",
          },
          isInt: {
            msg: "Relationship ID must be an integer",
          },
        },
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Dependent",
      tableName: "Dependents",
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

  return Dependent;
};
