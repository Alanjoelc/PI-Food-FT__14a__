const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING
    },
    healthScore: {
      type: DataTypes.INTEGER,
    },
    spoonacularScore: {
      type: DataTypes.INTEGER,
    },
    steps: { 
      type: DataTypes.TEXT,
    },
  });
};
