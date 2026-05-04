'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.CatRole, { foreignKey: 'catRoleId' });
      User.hasOne(models.Profile, { foreignKey: 'userId' });
      User.hasOne(models.Socio, { foreignKey: 'userId' });
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
            msg: 'Please enter your user uid',
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please enter a name',
          },
          len: {
            args: [1, 50],
            msg: 'Name must be between 1 and 50 characters long',
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
            msg: 'Please enter your email',
          },
        },
      },
      catRoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: {
            msg: 'Please enter a role',
          },
        },
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'User',
      tableName: 'Users',
      scopes: {
        raw: {
          raw: true,
          nest: true,
        },
        desc: {
          order: [['createdAt', 'desc']],
        },
      },
    }
  );
  return User;
};
