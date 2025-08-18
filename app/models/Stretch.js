const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class Stretch extends Model {}

Stretch.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    main_image: {
        type: DataTypes.STRING
    },
    description_image: {
        type: DataTypes.STRING
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "stretch"
});


module.exports = Stretch;