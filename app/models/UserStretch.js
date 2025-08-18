const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class UserStretch extends Model {}

UserStretch.init({
    user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "user",
      key: "id",
    },
  },
  stretch_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "stretch",
      key: "id",
    },
  },
}, {
    sequelize,
    tableName: "user_stretch"
});


module.exports = UserStretch;



