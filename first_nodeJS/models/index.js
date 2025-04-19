const Sequelize = require('sequelize');
const sequelize = require('../db');  // Đảm bảo rằng sequelize đã được cấu hình đúng

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./User')(sequelize, Sequelize.DataTypes);
db.Role = require('./Role')(sequelize, Sequelize.DataTypes);
db.Permission = require('./Permission')(sequelize, Sequelize.DataTypes);
db.RolePermission = require('./Role_permission')(sequelize, Sequelize.DataTypes);

db.User.associate(db);
db.Role.associate(db);
db.Permission.associate(db);

module.exports = db;
