const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Car = sequelize.define('Car', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'cars',  
  timestamps: false,  
});

module.exports = Car;
