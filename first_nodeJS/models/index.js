const Sequelize = require('sequelize');
const sequelize = require('../db');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import model
db.Car = require('/Car')(sequelize, Sequelize.DataTypes); 

module.exports = db;
