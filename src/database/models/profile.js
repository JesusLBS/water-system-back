"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profile.init(
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
      addressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: {
            msg: "Please enter an address",
          },
        },
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
      photoUrl: {
        type: DataTypes.TEXT("loog"),
        allowNull: true,
        validate: {
          isUrl: {
            msg: "Photo URL must be a valid URL",
          },
        },
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Profile",
      tableName: "Profiles",
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
  return Profile;
};
