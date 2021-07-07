const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {
    sequelize.define('intermediate', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    })
}